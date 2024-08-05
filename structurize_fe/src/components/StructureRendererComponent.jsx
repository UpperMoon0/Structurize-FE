import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

function StructureRendererComponent({ structure, blocks }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // Geometry
        const geometry = new THREE.BoxGeometry();

        // Collect geometries to merge
        const geometries = [];

        // Iterate over the 3D array and create cubes
        structure.forEach((layer, y) => {
            layer.forEach((row, x) => {
                row.forEach((cube, z) => {
                    if (cube !== 'minecraft:air') {
                        const block = blocks.find(b => b.id === cube);
                        if (block) {
                            const cubeGeometry = geometry.clone();
                            cubeGeometry.translate(x, -y, z);
                            geometries.push(cubeGeometry);

                            // Apply texture to the material
                            const textureBase64 = block.textures.all;
                            const textureLoader = new THREE.TextureLoader();
                            const texture = textureLoader.load(
                                'data:image/png;base64,' + textureBase64,
                                () => {
                                    texture.needsUpdate = true; // Ensure texture is updated
                                    texture.minFilter = THREE.NearestFilter;
                                    texture.magFilter = THREE.NearestFilter;
                                    texture.generateMipmaps = false;

                                    const material = new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff }); // Set color to white
                                    const mesh = new THREE.Mesh(cubeGeometry, material);
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

StructureRendererComponent.propTypes = {
    structure: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.string
            )
        )
    ).isRequired,
    blocks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            textures: PropTypes.object.isRequired
        })
    ).isRequired,
};

export default StructureRendererComponent;