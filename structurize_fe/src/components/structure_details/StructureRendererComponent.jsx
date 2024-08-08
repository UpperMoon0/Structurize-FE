import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import GeometryService from "../../api/GeometryService.js";

StructureRendererComponent.propTypes = {
    structure: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.number.isRequired
            )
        )
    ).isRequired,
    palette: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          properties: PropTypes.object.isRequired
        })
    ).isRequired,
    blocks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            textures: PropTypes.object.isRequired
        })
    ).isRequired
};

// This code is a mess, needs cleanup
function StructureRendererComponent({
    structure = [[[0]]],
    palette = [{ id: 'minecraft:air', properties: { type: 0 } }],
    blocks = [{ id: 'minecraft:air', name: 'Air', textures: { all: '' } }]
}) {
    const mountRef = useRef(null);

    useEffect(() => {

        const mount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Calculate the center point of the 3D block space
        const centerX = structure[0][0].length / 2;
        const centerY = -structure.length / 2;
        const centerZ = structure[0].length/ 2;
        const centerPoint = new THREE.Vector3(centerX, centerY, centerZ);
        const avgSize = (structure[0][0].length + structure.length + structure[0].length) / 3;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.set(centerPoint.x, centerPoint.y, centerPoint.z + avgSize * 2);
        camera.lookAt(centerPoint);

        // Renderer
        const renderer= new THREE.WebGLRenderer();
        //renderer.outputEncoding = 3001;
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Geometry
        let geometryService = new GeometryService();
        const blockGeometry = geometryService.getBlockGeometry();
        const straightStairsGeometry = geometryService.getStraightStairsGeometry();
        const innerCornerStairsGeometry = geometryService.getInnerCornerStairsGeometry();
        const outerCornerStairsGeometry = geometryService.getOuterCornerStairsGeometry();
        const slabGeometry = geometryService.getSlabGeometry();
        const pressurePlateGeometry = geometryService.getPressurePlateGeometry();
        const wallGeometry = geometryService.getWallGeometry();

        // Collect geometries to merge
        const geometries = [];

        // Iterate over the 3D array and create cubes
        structure.forEach((layer, y) => {
            layer.forEach((row, x) => {
                row.forEach((position, z) => {
                    const blockData = palette[position];
                    if (blockData.id !== 'minecraft:air') {
                        const block = blocks.find(b => b.id === blockData.id);
                        if (block) {
                            let geometry;

                            switch (blockData.properties.type) {
                                case 1: // Wall
                                    geometry = wallGeometry.clone();
                                    break;
                                case 2: // Slab
                                    geometry = slabGeometry.clone();
                                    if (blockData.properties.half === true) {
                                        geometry.translate(0, 0.5, 0);
                                    }
                                    break;
                                case 3: // Stairs
                                    switch (blockData.properties.shape) {
                                        case 1: // Inner left
                                            geometry = innerCornerStairsGeometry.clone();
                                            if (blockData.properties.half === true) {
                                                geometry.rotateX(Math.PI);
                                                geometry.rotateY(-Math.PI / 2);
                                            }
                                            break;
                                        case 2: // Inner right
                                            geometry = innerCornerStairsGeometry.clone();
                                            geometry.rotateY(Math.PI / 2);
                                            if (blockData.properties.half === true) {
                                                geometry.rotateX(Math.PI);
                                                geometry.rotateY(Math.PI / 2);
                                            }
                                            break;
                                        case 3: // Outer left
                                            geometry = outerCornerStairsGeometry.clone();
                                            if (blockData.properties.half === true) {
                                                geometry.rotateX(Math.PI);
                                                geometry.rotateY(-Math.PI / 2);
                                            }
                                            break;
                                        case 4: // Outer right
                                            geometry = outerCornerStairsGeometry.clone();
                                            geometry.rotateY(Math.PI / 2);
                                            if (blockData.properties.half === true) {
                                                geometry.rotateX(Math.PI);
                                                geometry.rotateY(Math.PI / 2);
                                            }
                                            break;
                                        default: // Straight
                                            geometry = straightStairsGeometry.clone();
                                            if (blockData.properties.half === true) {
                                                geometry.rotateX(Math.PI);
                                            }
                                    }

                                    switch (blockData.properties.facing) {
                                        case 1: // East
                                            geometry.rotateY(Math.PI / 2);
                                            break;
                                        case 2: // South
                                            geometry.rotateY(Math.PI);
                                            break;
                                        case 3: // West
                                            geometry.rotateY(-Math.PI / 2);
                                            break;
                                    }
                                    break;
                                case 4: // Pressure plate
                                    geometry = pressurePlateGeometry.clone();
                                    break;
                                default:
                                    geometry = blockGeometry.clone();
                            }

                            geometry.translate(x, -y, z);
                            geometries.push(geometry);

                            // Apply texture to the material
                            const textureBase64 = block.textures.all;
                            const textureLoader = new THREE.TextureLoader();
                            const texture = textureLoader.load(
                                'data:image/png;base64,' + textureBase64,
                                () => {
                                    texture.needsUpdate = true;
                                    texture.minFilter = THREE.NearestFilter;
                                    texture.magFilter = THREE.NearestFilter;
                                    texture.generateMipmaps = false;
                                    texture.colorSpace = THREE.SRGBColorSpace;

                                    const material = new THREE.MeshBasicMaterial({ map: texture });
                                    const mesh = new THREE.Mesh(geometry, material);
                                    scene.add(mesh);
                                },
                                undefined,
                                (err) => {
                                    console.error('Failed to load texture', err);
                                }
                            );
                        }
                    }
                });
            });
        });

        // Merge geometries if there are any
        if (geometries.length > 0) {
            const mergedGeometry = mergeGeometries(geometries);
            const mergedMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
            scene.add(mergedMesh);
        }

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(centerPoint.x, centerPoint.y, centerPoint.z);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            mount.removeChild(renderer.domElement);
        };
    }, [structure, blocks, palette]);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}

export default StructureRendererComponent;