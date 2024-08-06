import * as THREE from "three";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

class GeometryService {
    constructor() {
    }

    getStairsGeometry() {
        const step1Geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const step2Geometry = new THREE.BoxGeometry(0.5, 0.5, 1);

        // Position the steps
        step1Geometry.translate(0, -0.25, 0);
        step2Geometry.translate(-0.25, 0.25, 0);

        // Merge the geometries
        return mergeGeometries([step1Geometry, step2Geometry]);
    }

    getBlockGeometry() {
        return new THREE.BoxGeometry(1, 1, 1);
    }

    getSlabGeometry() {
        return new THREE.BoxGeometry(1, 0.5, 1);
    }
}

export default GeometryService;