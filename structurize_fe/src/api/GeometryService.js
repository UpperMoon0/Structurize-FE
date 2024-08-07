import * as THREE from "three";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

class GeometryService {
    constructor() {
    }

    getStraightStairsGeometry() {
        const step1Geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const step2Geometry = new THREE.BoxGeometry(0.5, 0.5, 1);

        // Position the steps
        step1Geometry.translate(0, -0.25, 0);
        step2Geometry.translate(-0.25, 0.25, 0);

        // Merge the geometries
        return mergeGeometries([step1Geometry, step2Geometry]);
    }

    getOuterCornerStairsGeometry() {
        const step1Geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const step2Geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

        // Position the steps
        step1Geometry.translate(0, -0.25, 0);
        step2Geometry.translate(-0.25, 0.25, -0.25);

        // Merge the geometries
        return mergeGeometries([step1Geometry, step2Geometry]);
    }

    getInnerCornerStairsGeometry() {
        const step1Geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const step2Geometry = new THREE.BoxGeometry(0.5, 0.5, 1);
        const step2SmallGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

        // Position the steps
        step1Geometry.translate(0, -0.25, 0);
        step2Geometry.translate(-0.25, 0.25, 0);
        step2SmallGeometry.translate(0.25, 0.25, -0.25);

        // Merge the geometries
        return mergeGeometries([step1Geometry, step2Geometry, step2SmallGeometry]);
    }

    getBlockGeometry() {
        return new THREE.BoxGeometry(1, 1, 1);
    }

    getSlabGeometry() {
        const geometry = new THREE.BoxGeometry(1, 0.5, 1);
        geometry.translate(0, -0.25, 0);
        return geometry;
    }

    getPressurePlateGeometry() {
        const geometry = new THREE.BoxGeometry(7/8, 1/16, 7/8);
        geometry.translate(0, -0.5 + 1/32, 0);
        return geometry;
    }

    getWallGeometry() {
        return new THREE.BoxGeometry(0.5, 1, 0.5);
    }
}

export default GeometryService;