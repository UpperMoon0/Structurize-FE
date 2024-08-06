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
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    properties: PropTypes.object
                })
            )
        )
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
function StructureRendererComponent({ structure, blocks }) {
    const mountRef = useRef(null);
    const geometryService = new GeometryService();

    useEffect(() => {
        const mount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer= new THREE.WebGLRenderer();
        //renderer.outputEncoding = 3001;
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Geometry
        const blockGeometry = geometryService.getBlockGeometry();
        const stairsGeometry = geometryService.getStairsGeometry();
        const slabGeometry = geometryService.getSlabGeometry();

        console.log('blockGeometry ' + blockGeometry + ' slabGeometry ' + slabGeometry);


        // Collect geometries to merge
        const geometries = [];

        // Iterate over the 3D array and create cubes
        structure.forEach((layer, y) => {
            layer.forEach((row, x) => {
                row.forEach((position, z) => {
                    if (position.id !== 'minecraft:air') {
                        const block = blocks.find(b => b.id === position.id);
                        if (block) {
                            let geometry;

                            console.log('Type: ' + position.properties.type);
                            switch (position.properties.type) {
                                case 3:
                                    geometry = stairsGeometry.clone();
                                    switch (position.properties.facing) {
                                        case 1: // East
                                            geometry.rotateY(-Math.PI / 2);
                                            break;
                                        case 2: // South
                                            geometry.rotateY(Math.PI);
                                            break;
                                        case 3: // West
                                            geometry.rotateY(Math.PI / 2);
                                            break;
                                    }

                                    // Flip the stairs if half
                                    if (position.properties.half === true) {
                                        geometry.rotateX(Math.PI);
                                    }
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
    }, [structure, blocks]);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}

export default StructureRendererComponent;