import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
var psgeometry;
(function (psgeometry) {
    class Matrix4 {
        /**
         * @param {?=} elements
         */
        constructor(elements) {
            this.elements = elements || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        static FromTranslation(x, y, z) {
            /** @type {?} */
            let result = new Matrix4();
            result.elements[3] = x;
            result.elements[7] = y;
            result.elements[11] = z;
            return result;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        static FromScaling(x, y, z) {
            /** @type {?} */
            let result = new Matrix4();
            result.elements[0] = x;
            result.elements[5] = y;
            result.elements[10] = z;
            return result;
        }
        /**
         * @param {?} angle
         * @return {?}
         */
        static FromRotationX(angle) {
            /** @type {?} */
            let cosA = Math.cos(angle);
            /** @type {?} */
            let sinA = Math.sin(angle);
            /** @type {?} */
            let result = new Matrix4();
            result.elements[5] = cosA;
            result.elements[6] = -sinA;
            result.elements[9] = sinA;
            result.elements[10] = cosA;
            return result;
        }
        /**
         * @param {?} angle
         * @return {?}
         */
        static FromRotationY(angle) {
            /** @type {?} */
            let cosA = Math.cos(angle);
            /** @type {?} */
            let sinA = Math.sin(angle);
            /** @type {?} */
            let result = new Matrix4();
            result.elements[0] = cosA;
            result.elements[2] = sinA;
            result.elements[8] = -sinA;
            result.elements[10] = cosA;
            return result;
        }
        /**
         * @param {?} angle
         * @return {?}
         */
        static FromRotationZ(angle) {
            /** @type {?} */
            let cosA = Math.cos(angle);
            /** @type {?} */
            let sinA = Math.sin(angle);
            /** @type {?} */
            let result = new Matrix4();
            result.elements[0] = cosA;
            result.elements[1] = -sinA;
            result.elements[4] = sinA;
            result.elements[5] = cosA;
            return result;
        }
        /**
         * @param {?} pitch
         * @param {?} yaw
         * @param {?} roll
         * @return {?}
         */
        static FromRotation(pitch, yaw, roll) {
            return new Matrix4([
                Math.cos(yaw) * Math.cos(pitch), Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), 0,
                Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) - Math.sin(yaw) * Math.cos(roll), Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) + Math.cos(yaw) * Math.cos(roll), Math.cos(pitch) * Math.sin(roll), 0,
                Math.cos(yaw) * Math.sin(pitch) * Math.cos(roll) + Math.sin(yaw) * Math.sin(roll), Math.sin(yaw) * Math.sin(pitch) * Math.cos(roll) - Math.cos(yaw) * Math.sin(roll), Math.cos(pitch) * Math.cos(roll), 0,
                0, 0, 0, 1
            ]).transpose();
        }
        /**
         * @param {?} colIdx
         * @param {?} rowIdx
         * @return {?}
         */
        e(colIdx, rowIdx) {
            /** @type {?} */
            let idx = colIdx + (rowIdx || 0) * 4;
            return idx >= 0 && idx < 16 ? this.elements[idx] : null;
        }
        ;
        /**
         * @param {?} idx
         * @return {?}
         */
        row(idx) {
            if (idx >= 0 && idx < 4) {
                return new Vec4(this.elements[idx * 4], this.elements[idx * 4 + 1], this.elements[idx * 4 + 2], this.elements[idx * 4 + 3]);
            }
            else {
                return null;
            }
        }
        ;
        /**
         * @param {?} idx
         * @return {?}
         */
        col(idx) {
            if (idx <= 0 && idx < 4) {
                return new Vec4(this.elements[idx], this.elements[idx + 4], this.elements[idx + 8], this.elements[idx + 12]);
            }
            else {
                return null;
            }
        }
        /**
         * @param {?} m
         * @return {?}
         */
        equals(m) {
            if (m) {
                /** @type {?} */
                let l = this.elements;
                /** @type {?} */
                let r = m.elements;
                return l[0] == r[0] && l[1] == r[1] && l[2] == r[2] && l[3] == r[3] &&
                    l[4] == r[4] && l[5] == r[5] && l[6] == r[6] && l[7] == r[7] &&
                    l[8] == r[8] && l[9] == r[9] && l[10] == r[10] && l[11] == r[11] &&
                    l[12] == r[12] && l[13] == r[13] && l[14] == r[14] && l[15] == r[15];
            }
            else {
                return false;
            }
        }
        /**
         * @param {?} m
         * @return {?}
         */
        multiply(m) {
            if (m instanceof Matrix4) {
                /** @type {?} */
                let l = this.elements;
                /** @type {?} */
                let r = m.elements;
                return new Matrix4([
                    l[0] * r[0] + l[4] * r[1] + l[8] * r[2] + l[12] * r[3],
                    l[1] * r[0] + l[5] * r[1] + l[9] * r[2] + l[13] * r[3],
                    l[2] * r[0] + l[6] * r[1] + l[10] * r[2] + l[14] * r[3],
                    l[3] * r[0] + l[7] * r[1] + l[11] * r[2] + l[15] * r[3],
                    l[0] * r[4] + l[4] * r[5] + l[8] * r[6] + l[12] * r[7],
                    l[1] * r[4] + l[5] * r[5] + l[9] * r[6] + l[13] * r[7],
                    l[2] * r[4] + l[6] * r[5] + l[10] * r[6] + l[14] * r[7],
                    l[3] * r[4] + l[7] * r[5] + l[11] * r[6] + l[15] * r[7],
                    l[0] * r[8] + l[4] * r[9] + l[8] * r[10] + l[12] * r[11],
                    l[1] * r[8] + l[5] * r[9] + l[9] * r[10] + l[13] * r[11],
                    l[2] * r[8] + l[6] * r[9] + l[10] * r[10] + l[14] * r[11],
                    l[3] * r[8] + l[7] * r[9] + l[11] * r[10] + l[15] * r[11],
                    l[0] * r[12] + l[4] * r[13] + l[8] * r[14] + l[12] * r[15],
                    l[1] * r[12] + l[5] * r[13] + l[9] * r[14] + l[13] * r[15],
                    l[2] * r[12] + l[6] * r[13] + l[10] * r[14] + l[14] * r[15],
                    l[3] * r[12] + l[7] * r[13] + l[11] * r[14] + l[15] * r[15]
                ]);
            }
            else if (m instanceof Vec4) {
                return new Vec4(m.x * this.elements[0] + m.y * this.elements[1] + m.z * this.elements[2] + m.w * this.elements[3], m.x * this.elements[4] + m.y * this.elements[5] + m.z * this.elements[6] + m.w * this.elements[7], m.x * this.elements[8] + m.y * this.elements[9] + m.z * this.elements[10] + m.w * this.elements[11], m.x * this.elements[12] + m.y * this.elements[13] + m.z * this.elements[14] + m.w * this.elements[15]);
            }
            else {
                return new Matrix4(this.elements.map(function (e) { return e * (/** @type {?} */ (m)); }));
            }
        }
        /**
         * @return {?}
         */
        toRightTriangular() {
            return new Matrix4(Matrix.toRightTriangular(this.elements, 4, 4));
        }
        /**
         * @return {?}
         */
        determinant() {
            /** @type {?} */
            let m = this.toRightTriangular();
            return m.elements[0] * m.elements[5] * m.elements[10] * m.elements[15];
        }
        /**
         * @return {?}
         */
        isSingular() {
            return this.determinant() === 0;
        }
        /**
         * @return {?}
         */
        transpose() {
            /** @type {?} */
            let e = this.elements;
            return new Matrix4([
                e[0], e[4], e[8], e[12],
                e[1], e[5], e[9], e[13],
                e[2], e[6], e[10], e[14],
                e[3], e[7], e[11], e[15]
            ]);
        }
        /**
         * @return {?}
         */
        inverse() {
            if (!this.isSingular()) {
                /** @type {?} */
                let augmentedMatrix = [
                    this.elements[0], this.elements[1], this.elements[2], this.elements[3], 1, 0, 0, 0,
                    this.elements[4], this.elements[5], this.elements[6], this.elements[7], 0, 1, 0, 0,
                    this.elements[8], this.elements[9], this.elements[10], this.elements[11], 0, 0, 1, 0,
                    this.elements[12], this.elements[13], this.elements[14], this.elements[15], 0, 0, 0, 1
                ];
                /** @type {?} */
                let m = Matrix.toRightTriangular(augmentedMatrix, 4, 8);
                for (let row = 3; row >= 0; row--) {
                    /** @type {?} */
                    let divisor = m[row * 9];
                    for (let col = 0; col < 8; col++) {
                        m[row * 8 + col] = m[row * 8 + col] / divisor;
                    }
                    for (let altrow = row - 1; altrow >= 0; altrow--) {
                        /** @type {?} */
                        let multiplier = m[altrow * 8 + row];
                        for (let col = 0; col < 8; col++) {
                            m[altrow * 8 + col] = m[altrow * 8 + col] - m[row * 8 + col] * multiplier;
                        }
                    }
                }
                return new Matrix4([
                    m[4], m[5], m[6], m[7],
                    m[12], m[13], m[14], m[15],
                    m[20], m[21], m[22], m[23],
                    m[28], m[29], m[30], m[31]
                ]);
            }
            else {
                return null;
            }
        }
    }
    Matrix4.Identity = new Matrix4();
    psgeometry.Matrix4 = Matrix4;
    class Matrix3 {
        /**
         * @param {?=} elements
         */
        constructor(elements) {
            this.elements = elements || [1, 0, 0, 0, 1, 0, 0, 0, 1];
        }
        /**
         * @param {?} colIdx
         * @param {?} rowIdx
         * @return {?}
         */
        e(colIdx, rowIdx) {
            /** @type {?} */
            let idx = colIdx + (rowIdx || 0) * 3;
            return idx >= 0 && idx < 9 ? this.elements[idx] : null;
        }
        /**
         * @param {?} idx
         * @return {?}
         */
        row(idx) {
            if (idx >= 0 && idx < 3) {
                return new Vec3(this.elements[idx * 3], this.elements[idx * 3 + 1], this.elements[idx * 3 + 2]);
            }
            else {
                return null;
            }
        }
        /**
         * @param {?} idx
         * @return {?}
         */
        col(idx) {
            if (idx <= 0 && idx < 3) {
                return new Vec3(this.elements[idx], this.elements[idx + 3], this.elements[idx + 6]);
            }
            else {
                return null;
            }
        }
        /**
         * @param {?} m
         * @return {?}
         */
        multiply(m) {
            if (m instanceof Matrix3) {
                /** @type {?} */
                let l = this.elements;
                /** @type {?} */
                let r = m.elements;
                return new Matrix3([
                    l[0] * r[0] + l[3] * r[1] + l[6] * r[2],
                    l[1] * r[0] + l[4] * r[1] + l[7] * r[2],
                    l[2] * r[0] + l[5] * r[1] + l[8] * r[2],
                    l[0] * r[3] + l[3] * r[4] + l[6] * r[5],
                    l[1] * r[3] + l[4] * r[4] + l[7] * r[5],
                    l[2] * r[3] + l[5] * r[4] + l[8] * r[5],
                    l[0] * r[6] + l[3] * r[7] + l[6] * r[8],
                    l[1] * r[6] + l[4] * r[7] + l[7] * r[8],
                    l[2] * r[6] + l[5] * r[7] + l[8] * r[8]
                ]);
            }
            else if (m instanceof Vec3) {
                return new Vec3(m.x * this.elements[0] + m.y * this.elements[1] + m.z * this.elements[2], m.x * this.elements[3] + m.y * this.elements[4] + m.z * this.elements[5], m.x * this.elements[6] + m.y * this.elements[7] + m.z * this.elements[8]);
            }
            else {
                return new Matrix3(this.elements.map(function (e) { return e * (/** @type {?} */ (m)); }));
            }
        }
        /**
         * @return {?}
         */
        toRightTriangular() {
            return new Matrix3(Matrix.toRightTriangular(this.elements, 3, 3));
        }
        /**
         * @return {?}
         */
        determinant() {
            /** @type {?} */
            let m = this.toRightTriangular();
            return m.elements[0] * m.elements[4] * m.elements[8];
        }
        /**
         * @return {?}
         */
        isSingular() {
            return this.determinant() === 0;
        }
        /**
         * @return {?}
         */
        transpose() {
            /** @type {?} */
            let e = this.elements;
            return new Matrix3([
                e[0], e[3], e[6],
                e[1], e[4], e[7],
                e[2], e[5], e[8]
            ]);
        }
        /**
         * @return {?}
         */
        inverse() {
            if (!this.isSingular()) {
                /** @type {?} */
                let augmentedMatrix = [
                    this.elements[0], this.elements[1], this.elements[2], 1, 0, 0,
                    this.elements[3], this.elements[4], this.elements[5], 0, 1, 0,
                    this.elements[6], this.elements[7], this.elements[8], 0, 0, 1,
                ];
                /** @type {?} */
                let m = Matrix.toRightTriangular(augmentedMatrix, 3, 6);
                for (let row = 2; row >= 0; row--) {
                    /** @type {?} */
                    let divisor = m[row * 7];
                    for (let col = 0; col < 6; col++) {
                        m[row * 7 + col] = m[row * 7 + col] / divisor;
                    }
                    for (let altrow = row - 1; altrow >= 0; altrow--) {
                        /** @type {?} */
                        let multiplier = m[altrow * 6 + row];
                        for (let col = 0; col < 6; col++) {
                            m[altrow * 6 + col] = m[altrow * 6 + col] - m[row * 6 + col] * multiplier;
                        }
                    }
                }
                return new Matrix3([
                    m[3], m[4], m[5],
                    m[9], m[10], m[11],
                    m[15], m[16], m[17]
                ]);
            }
            else {
                return null;
            }
        }
    }
    Matrix3.Identity = new Matrix3();
    psgeometry.Matrix3 = Matrix3;
    class Matrix {
        /**
         * @param {?} elements
         * @param {?} rows
         * @param {?} cols
         * @return {?}
         */
        static toRightTriangular(elements, rows, cols) {
            /** @type {?} */
            let m = elements.slice(0);
            for (let row = 0; row < rows; row++) {
                if (m[row * (cols + 1)] == 0) {
                    for (let altrow = row + 1; altrow < rows; altrow++) {
                        if (m[altrow * cols + row] != 0) {
                            for (let j = 0; j < cols; j++) {
                                m[row * cols + j] += m[altrow * cols + j];
                            }
                            break;
                        }
                    }
                }
                if (m[row * (cols + 1)] != 0) {
                    for (let altrow = row + 1; altrow < rows; altrow++) {
                        /** @type {?} */
                        let multiplier = m[altrow * cols + row] / m[row * (cols + 1)];
                        for (let j = 0; j < cols; j++) {
                            m[altrow * cols + j] = j < row ? 0 : m[altrow * cols + j] - m[row * cols + j] * multiplier;
                        }
                    }
                }
            }
            return m;
        }
    }
    psgeometry.Matrix = Matrix;
    class Vec3 {
        /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         */
        constructor(x, y, z) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
        }
        /**
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        asVec3() {
            return (/** @type {?} */ (this));
        }
        /**
         * @param {?=} w
         * @return {?}
         */
        asVec4(w) {
            return new Vec4(this.x, this.y, this.z, w || 1.0);
        }
        /**
         * @param {?} v
         * @return {?}
         */
        equals(v) {
            return this.x == v.x && this.y == v.y && this.z == v.z;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        assignPoint(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        assignVec(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }
        /**
         * @param {?} vec
         * @return {?}
         */
        add(vec) {
            return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
        }
        /**
         * @param {?} vec
         * @return {?}
         */
        sub(vec) {
            return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
        }
        /**
         * @param {?} vec
         * @return {?}
         */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        cross(v) {
            return new Vec3((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x));
        }
        /**
         * @param {?} s
         * @return {?}
         */
        multiply(s) {
            return new Vec3(this.x * s, this.y * s, this.z * s);
        }
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} q
         * @return {THIS}
         */
        applyQuaternion(q) {
            /** @type {?} */
            let x = (/** @type {?} */ (this)).x;
            /** @type {?} */
            let y = (/** @type {?} */ (this)).y;
            /** @type {?} */
            let z = (/** @type {?} */ (this)).z;
            /** @type {?} */
            let qx = q.x;
            /** @type {?} */
            let qy = q.y;
            /** @type {?} */
            let qz = q.z;
            /** @type {?} */
            let qw = q.w;
            // quaternion * vector
            /** @type {?} */
            let px = qw * x + qy * z - qz * y;
            /** @type {?} */
            let py = qw * y + qz * x - qx * z;
            /** @type {?} */
            let pz = qw * z + qx * y - qy * x;
            /** @type {?} */
            let pw = -qx * x - qy * y - qz * z;
            // product * inverse quaternion
            (/** @type {?} */ (this)).x = px * qw - pw * qx - py * qz + pz * qy;
            (/** @type {?} */ (this)).y = py * qw - pw * qy - pz * qx + px * qz;
            (/** @type {?} */ (this)).z = pz * qw - pw * qz - px * qy + py * qx;
            return (/** @type {?} */ (this));
        }
        /**
         * @return {?}
         */
        norm() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        /**
         * @return {?}
         */
        normalize() {
            return this.multiply(1 / this.norm());
        }
        /**
         * @return {?}
         */
        elements() {
            return [this.x, this.y, this.z];
        }
        /**
         * @param {?} v
         * @return {?}
         */
        squaredDist(v) {
            return (this.x - v.x) * (this.x - v.x) +
                (this.y - v.y) * (this.y - v.y) +
                (this.z - v.z) * (this.z - v.z);
        }
    }
    psgeometry.Vec3 = Vec3;
    class Vec4 {
        /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         * @param {?=} w
         */
        constructor(x, y, z, w) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
            this.w = w || 0.0;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        equals(v) {
            return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
        }
        /**
         * @return {?}
         */
        asVec3() {
            return new Vec3(this.x, this.y, this.z);
        }
        /**
         * @return {?}
         */
        asVec4() {
            return this;
        }
        /**
         * @param {?} vec
         * @return {?}
         */
        add(vec) {
            return new Vec4(this.x + vec.x, this.y + vec.y, this.z + vec.z, this.w + vec.w);
        }
        /**
         * @param {?} vec
         * @return {?}
         */
        sub(vec) {
            return new Vec4(this.x - vec.x, this.y - vec.y, this.z - vec.z, this.w - vec.w);
        }
        /**
         * @param {?} vec
         * @return {?}
         */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        cross(v) {
            return new Vec4((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x), 1.0);
        }
        /**
         * @param {?} s
         * @return {?}
         */
        multiply(s) {
            return new Vec4(this.x * s, this.y * s, this.z * s, this.w * s);
        }
        /**
         * @return {?}
         */
        norm() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
        /**
         * @return {?}
         */
        normalize() {
            return this.multiply(1 / this.norm());
        }
        /**
         * @return {?}
         */
        elements() {
            return [this.x, this.y, this.z, this.w];
        }
        /**
         * @param {?} v
         * @return {?}
         */
        squaredDist(v) {
            return (this.x - v.x) * (this.x - v.x) +
                (this.y - v.y) * (this.y - v.y) +
                (this.z - v.z) * (this.z - v.z) +
                (this.w - v.w) * (this.w - v.w);
        }
    }
    Vec4.Zero = new Vec4(0.0, 0.0, 0.0, 0.0);
    Vec4.One = new Vec4(1.0, 1.0, 1.0, 1.0);
    psgeometry.Vec4 = Vec4;
    class Quaternion {
        /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         * @param {?=} w
         */
        constructor(x, y, z, w) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
            this.w = typeof w == 'undefined' ? 1.0 : w;
        }
        /**
         * @param {?} axis
         * @param {?} angle
         * @return {?}
         */
        setFromAxisAngle(axis, angle) {
            /** @type {?} */
            let halfAngle = angle / 2;
            /** @type {?} */
            let s = Math.sin(halfAngle);
            this.x = axis.x * s;
            this.y = axis.y * s;
            this.z = axis.z * s;
            this.w = Math.cos(halfAngle);
            return this;
        }
        /**
         * @param {?} q
         * @return {?}
         */
        multiply(q) {
            /** @type {?} */
            let x = this.x;
            /** @type {?} */
            let y = this.y;
            /** @type {?} */
            let z = this.z;
            /** @type {?} */
            let w = this.w;
            /** @type {?} */
            let qx = q.x;
            /** @type {?} */
            let qy = q.y;
            /** @type {?} */
            let qz = q.z;
            /** @type {?} */
            let qw = q.w;
            this.x = x * qw + w * qx + y * qz - z * qy;
            this.y = y * qw + w * qy + z * qx - x * qz;
            this.z = z * qw + w * qz + x * qy - y * qx;
            this.w = w * qw - x * qx - y * qy - z * qz;
        }
    }
    psgeometry.Quaternion = Quaternion;
    class AABB3D {
        constructor() {
            this.minX = +Infinity;
            this.maxX = -Infinity;
            this.minY = +Infinity;
            this.maxY = -Infinity;
            this.minZ = +Infinity;
            this.maxZ = -Infinity;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        addPoint(x, y, z) {
            this.minX = Math.min(this.minX, x);
            this.maxX = Math.max(this.maxX, x);
            this.minY = Math.min(this.minY, y);
            this.maxY = Math.max(this.maxY, y);
            this.minZ = Math.min(this.minZ, z);
            this.maxZ = Math.max(this.maxZ, z);
        }
        /**
         * @param {?} v
         * @return {?}
         */
        addVector(v) {
            this.addPoint(v.x, v.y, v.z);
        }
        /**
         * @param {?} box
         * @return {?}
         */
        addAABB(box) {
            this.addPoint(box.minX, box.minY, box.minZ);
            this.addPoint(box.maxX, box.maxY, box.maxZ);
        }
        /**
         * @return {?}
         */
        clear() {
            this.minX = +Infinity;
            this.maxX = -Infinity;
            this.minY = +Infinity;
            this.maxY = -Infinity;
            this.minZ = +Infinity;
            this.maxZ = -Infinity;
        }
        /**
         * @return {?}
         */
        center() {
            return new Vec3(.5 * (this.minX + this.maxX), .5 * (this.minY + this.maxY), .5 * (this.minZ + this.maxZ));
        }
        /**
         * @return {?}
         */
        extents() {
            return new Vec3((this.maxX - this.minX), (this.maxY - this.minY), (this.maxZ - this.minZ));
        }
        /**
         * @return {?}
         */
        min() {
            return new Vec3(this.minX, this.minY, this.minZ);
        }
        /**
         * @return {?}
         */
        max() {
            return new Vec3(this.maxX, this.maxY, this.maxZ);
        }
        /**
         * @param {?} v
         * @return {?}
         */
        contains(v) {
            return v.x >= this.minX && v.x <= this.maxX &&
                v.y >= this.minY && v.y <= this.maxY &&
                v.z >= this.minZ && v.z <= this.maxZ;
        }
        /**
         * @param {?} matrix
         * @return {?}
         */
        transform(matrix) {
            /** @type {?} */
            let result = new AABB3D();
            /** @type {?} */
            let minV = (/** @type {?} */ (matrix.multiply(new Vec4(this.minX, this.minY, this.minZ, 1))));
            /** @type {?} */
            let maxV = (/** @type {?} */ (matrix.multiply(new Vec4(this.maxX, this.maxY, this.maxZ, 1))));
            result.minX = minV.x;
            result.minY = minV.y;
            result.minZ = minV.z;
            result.maxX = maxV.x;
            result.maxY = maxV.y;
            result.maxZ = maxV.z;
            return result;
        }
        /**
         * @param {?} ray
         * @return {?}
         */
        intersectsRay(ray) {
            /** @type {?} */
            let result = null;
            /** @type {?} */
            let v0 = ray.p0.asVec3();
            /** @type {?} */
            let dir = ray.p1.asVec3().sub(ray.p0.asVec3());
            /** @type {?} */
            let intX0 = ray.intersectRayWithPlane(new Vec3(this.minX, 0, 0), new Vec3(-1, 0, 0));
            /** @type {?} */
            let intX1 = ray.intersectRayWithPlane(new Vec3(this.maxX, 0, 0), new Vec3(1, 0, 0));
            /** @type {?} */
            let intY0 = ray.intersectRayWithPlane(new Vec3(0, this.minY, 0), new Vec3(0, -1, 0));
            /** @type {?} */
            let intY1 = ray.intersectRayWithPlane(new Vec3(0, this.maxY, 0), new Vec3(0, 1, 0));
            /** @type {?} */
            let intZ0 = ray.intersectRayWithPlane(new Vec3(0, 0, this.minZ), new Vec3(0, 0, -1));
            /** @type {?} */
            let intZ1 = ray.intersectRayWithPlane(new Vec3(0, 0, this.maxZ), new Vec3(0, 0, 1));
            /** @type {?} */
            let currDist = Infinity;
            if (intX0 && this.contains(intX0)) {
                currDist = v0.squaredDist(intX0);
                result = intX0;
            }
            if (intX1 && this.contains(intX1) && v0.squaredDist(intX1) < currDist) {
                currDist = v0.squaredDist(intX1);
                result = intX1;
            }
            if (intY0 && this.contains(intY0) && v0.squaredDist(intY0) < currDist) {
                currDist = v0.squaredDist(intY0);
                result = intY0;
            }
            if (intY1 && this.contains(intY1) && v0.squaredDist(intY1) < currDist) {
                currDist = v0.squaredDist(intY1);
                result = intY1;
            }
            if (intZ0 && this.contains(intZ0) && v0.squaredDist(intZ0) < currDist) {
                currDist = v0.squaredDist(intZ0);
                result = intZ0;
            }
            if (intZ1 && this.contains(intZ1) && v0.squaredDist(intZ1) < currDist) {
                currDist = v0.squaredDist(intZ1);
                result = intZ1;
            }
            return result;
        }
    }
    psgeometry.AABB3D = AABB3D;
    class Point3D {
        /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         */
        constructor(x, y, z) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
        }
        /**
         * @return {?}
         */
        asVec3() {
            return new Vec3(this.x, this.y, this.z);
        }
        /**
         * @param {?=} w
         * @return {?}
         */
        asVec4(w) {
            return new Vec4(this.x, this.y, this.z, w || 1.0);
        }
    }
    psgeometry.Point3D = Point3D;
    class Line3D {
        /**
         * @param {?} p0
         * @param {?} p1
         */
        constructor(p0, p1) {
            this.p0 = p0 || new Point3D();
            this.p1 = p1 || new Point3D();
        }
        /**
         * @param {?} v0
         * @param {?} n
         * @return {?}
         */
        intersectRayWithPlane(v0, n) {
            /** @type {?} */
            let result = null;
            /** @type {?} */
            let u = this.p1.asVec3().sub(this.p0.asVec3());
            /** @type {?} */
            let D = n.dot(u);
            if (D != 0) {
                /** @type {?} */
                let w = this.p0.asVec3().sub(v0);
                /** @type {?} */
                let N = -n.dot(w);
                /** @type {?} */
                let sI = N / D;
                if (sI >= 0) {
                    result = this.p0.asVec3().add(u.multiply(sI));
                }
            }
            return result;
        }
        /**
         * @param {?} p0
         * @param {?} p1
         * @param {?} p2
         * @return {?}
         */
        intersectTriangle(p0, p1, p2) {
            /** @type {?} */
            let matrix = new Matrix3([
                this.p0.x - this.p1.x, p1.x - p0.x, p2.x - p0.x,
                this.p0.y - this.p1.y, p1.y - p0.y, p2.y - p0.y,
                this.p0.z - this.p1.z, p1.z - p0.z, p2.z - p0.z
            ]).inverse();
            if (matrix) {
                /** @type {?} */
                let res = matrix.multiply(this.p0.asVec3().sub(p0.asVec3()));
                if (res && ((/** @type {?} */ (res))).y >= 0 && ((/** @type {?} */ (res))).y <= 1.0 && ((/** @type {?} */ (res))).z >= 0 && ((/** @type {?} */ (res))).z <= 1.0 && ((/** @type {?} */ (res))).y + ((/** @type {?} */ (res))).z <= 1.0) {
                    return p0.asVec3()
                        .add(p1.asVec3().sub(p0.asVec3()).multiply(((/** @type {?} */ (res))).y))
                        .add(p2.asVec3().sub(p0.asVec3()).multiply(((/** @type {?} */ (res))).z));
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        /**
         * @param {?} matrix
         * @return {?}
         */
        transform(matrix) {
            /** @type {?} */
            let v0 = (/** @type {?} */ (matrix.multiply(this.p0.asVec4())));
            /** @type {?} */
            let v1 = (/** @type {?} */ (matrix.multiply(this.p1.asVec4())));
            return new Line3D(new Point3D(v0.x, v0.y, v0.z), new Point3D(v1.x, v1.y, v1.z));
        }
    }
    psgeometry.Line3D = Line3D;
    class Camera {
        /**
         * @param {?=} position
         * @param {?=} direction
         * @param {?=} up
         */
        constructor(position, direction, up) {
            this._position = position || new Vec3(0.0, 0.0, 20.0);
            this._direction = direction || new Vec3(0.0, 0.0, -1.0);
            this._up = up || new Vec3(0.0, 1.0, 0.0);
        }
        /**
         * @return {?}
         */
        changed() {
            this.currentViewMatrix = null;
        }
        /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         * @return {?}
         */
        setPosition(x, y, z) {
            this._position.x = x || 0.0;
            this._position.y = y || 0.0;
            this._position.z = z || 0.0;
            this.changed();
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        setDirection(x, y, z) {
            this._direction.x = x;
            this._direction.y = y;
            this._direction.z = z;
            this.changed();
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        setCenter(x, y, z) {
            this._direction.x = x - this._position.x;
            this._direction.y = y - this._position.y;
            this._direction.z = z - this._position.z;
            this.changed();
        }
        /**
         * @return {?}
         */
        getPosition() {
            return this._position;
        }
        /**
         * @return {?}
         */
        asVec3() {
            return this._position;
        }
        /**
         * @return {?}
         */
        asVec4() {
            return this._position.asVec4();
        }
        /**
         * @param {?} width
         * @param {?} height
         * @return {?}
         */
        getProjectionMatrix(width, height) {
            return this.makePerspective(45, width / height, 0.1, 10000.0);
        }
        /**
         * @return {?}
         */
        getViewMatrix() {
            return (/** @type {?} */ (this.makeLookAt()));
        }
        /**
         * @private
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        makePerspective(fovy, aspect, znear, zfar) {
            /** @type {?} */
            let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
            /** @type {?} */
            let ymin = -ymax;
            /** @type {?} */
            let xmin = ymin * aspect;
            /** @type {?} */
            let xmax = ymax * aspect;
            return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
        }
        /**
         * @private
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        makeFrustum(left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            let x = 2 * znear / (right - left);
            /** @type {?} */
            let y = 2 * znear / (top - bottom);
            /** @type {?} */
            let a = (right + left) / (right - left);
            /** @type {?} */
            let b = (top + bottom) / (top - bottom);
            /** @type {?} */
            let c = -(zfar + znear) / (zfar - znear);
            /** @type {?} */
            let d = -2 * zfar * znear / (zfar - znear);
            return new Matrix4([x, 0, a, 0,
                0, y, b, 0,
                0, 0, c, d,
                0, 0, -1, 0]);
        }
        /**
         * @private
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        makeOrtho(left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            let tx = -(right + left) / (right - left);
            /** @type {?} */
            let ty = -(top + bottom) / (top - bottom);
            /** @type {?} */
            let tz = -(zfar + znear) / (zfar - znear);
            return new Matrix4([2 / (right - left), 0, 0, tx,
                0, 2 / (top - bottom), 0, ty,
                0, 0, -2 / (zfar - znear), tz,
                0, 0, 0, 1]);
        }
        /**
         * @private
         * @return {?}
         */
        makeLookAt() {
            /** @type {?} */
            let eye = this._position;
            /** @type {?} */
            let center = this._position.add(this._direction);
            /** @type {?} */
            let up = this._up;
            /** @type {?} */
            let z = eye.sub(center).normalize();
            /** @type {?} */
            let x = up.cross(z).normalize();
            /** @type {?} */
            let y = z.cross(x).normalize();
            /** @type {?} */
            let m = new Matrix4([
                x.x, x.y, x.z, 0,
                y.x, y.y, y.z, 0,
                z.x, z.y, z.z, 0,
                0, 0, 0, 1
            ]);
            /** @type {?} */
            let t = new Matrix4([
                1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1
            ]);
            return (/** @type {?} */ (t.multiply(m)));
        }
    }
    psgeometry.Camera = Camera;
    class Vec2 {
        /**
         * @param {?=} x
         * @param {?=} y
         */
        constructor(x, y) {
            this.x = x || 0.0;
            this.y = y || 0.0;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        sub(v) {
            return new Vec2(this.x - v.x, this.y - v.y);
        }
        /**
         * @param {?} a
         * @param {?} b
         * @param {?} c
         * @param {?} p
         * @return {?}
         */
        static insideTri(a, b, c, p) {
            return Vec2.cross(c.sub(b), p.sub(b)) >= .0 &&
                Vec2.cross(a.sub(c), p.sub(c)) >= .0 &&
                Vec2.cross(b.sub(a), p.sub(a)) >= .0;
        }
        ;
        /**
         * @param {?} v0
         * @param {?} v1
         * @return {?}
         */
        static cross(v0, v1) {
            return v0.x * v1.y - v0.y * v1.x;
        }
    }
    psgeometry.Vec2 = Vec2;
    class Polygon2D {
        constructor() {
            this.vertices = [];
        }
        /**
         * @return {?}
         */
        get Vertices() {
            return this.vertices;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        addVertex(x, y) {
            this.vertices.push(new Vec2(x, y));
        }
        /**
         * @param {?} v
         * @return {?}
         */
        addVector(v) {
            this.vertices.push(v);
        }
        /**
         * @param {?} box
         * @return {?}
         */
        addToAABB(box) {
            this.vertices.forEach((p) => {
                box.addVector(p);
            });
        }
        /**
         * @return {?}
         */
        clear() {
            this.vertices.length = 0;
        }
        /**
         * @return {?}
         */
        getArea() {
            // see: https://stackoverflow.com/a/1165943
            /** @type {?} */
            let result = 0;
            /** @type {?} */
            let n = this.vertices.length;
            for (let i = n - 1, q = 0; q < n; i = q++) {
                result += this.vertices[i].x * this.vertices[q].y - this.vertices[q].x * this.vertices[i].y;
            }
            return result * 0.5;
        }
        /**
         * @private
         * @param {?} u
         * @param {?} v
         * @param {?} w
         * @param {?} n
         * @param {?} indices
         * @return {?}
         */
        snip(u, v, w, n, indices) {
            /** @type {?} */
            let result;
            /** @type {?} */
            let a = this.vertices[indices[u]];
            /** @type {?} */
            let b = this.vertices[indices[v]];
            /** @type {?} */
            let c = this.vertices[indices[w]];
            /** @type {?} */
            let p;
            result = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > Polygon2D.Epsilon;
            for (let i = 0; i < n && result; ++i) {
                if ((i != u) && (i != v) && (i != w)) {
                    p = this.vertices[indices[i]];
                    result = !Vec2.insideTri(a, b, c, p);
                }
            }
            return result;
        }
        /**
         * @return {?}
         */
        triangulate() {
            /** @type {?} */
            let result = new Polygon2D();
            /** @type {?} */
            let n = this.vertices.length;
            if (n > 2) {
                /** @type {?} */
                let indices = [];
                if (this.getArea() > .0) {
                    for (let i = 0; i < n; ++i)
                        indices[i] = i;
                }
                else {
                    for (let i = 0; i < n; ++i)
                        indices[i] = (n - 1) - i;
                }
                /** @type {?} */
                let nv = n;
                /*  remove nv-2 Vertices, creating 1 triangle every time */
                /** @type {?} */
                let count = 2 * nv;
                for (let v = nv - 1; nv > 2;) {
                    /* if we loop, it is probably a non-simple polygon */
                    if (0 >= count--) {
                        return new Polygon2D();
                    }
                    /* three consecutive vertices in current polygon, <u,v,w> */
                    /** @type {?} */
                    let u = v;
                    if (nv <= u)
                        u = 0; /* previous */
                    v = u + 1;
                    if (nv <= v)
                        v = 0; /* new v    */
                    /* new v    */
                    /** @type {?} */
                    let w = v + 1;
                    if (nv <= w)
                        w = 0; /* next     */
                    if (this.snip(u, v, w, nv, indices)) {
                        /** @type {?} */
                        let a;
                        /** @type {?} */
                        let b;
                        /** @type {?} */
                        let c;
                        /** @type {?} */
                        let s;
                        /** @type {?} */
                        let t;
                        /* true names of the vertices */
                        a = indices[u];
                        b = indices[v];
                        c = indices[w];
                        /* output Triangle */
                        result.addVector(this.vertices[c]);
                        result.addVector(this.vertices[b]);
                        result.addVector(this.vertices[a]);
                        /* remove v from remaining polygon */
                        for (s = v, t = v + 1; t < nv; s++, t++) {
                            indices[s] = indices[t];
                        }
                        --nv;
                        /* reset error detection counter */
                        count = 2 * nv;
                    }
                }
            }
            return result;
        }
    }
    Polygon2D.Epsilon = 1e-10;
    psgeometry.Polygon2D = Polygon2D;
    class AABB2D {
        constructor() {
            this.minX = +Infinity;
            this.maxX = -Infinity;
            this.minY = +Infinity;
            this.maxY = -Infinity;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        addPoint(x, y) {
            this.minX = Math.min(this.minX, x);
            this.maxX = Math.max(this.maxX, x);
            this.minY = Math.min(this.minY, y);
            this.maxY = Math.max(this.maxY, y);
        }
        /**
         * @param {?} v
         * @return {?}
         */
        addVector(v) {
            this.addPoint(v.x, v.y);
        }
        /**
         * @param {?} box
         * @return {?}
         */
        addAABB(box) {
            this.addPoint(box.minX, box.minY);
            this.addPoint(box.maxX, box.maxY);
        }
        /**
         * @return {?}
         */
        clear() {
            this.minX = +Infinity;
            this.maxX = -Infinity;
            this.minY = +Infinity;
            this.maxY = -Infinity;
        }
        /**
         * @return {?}
         */
        center() {
            return new Vec2(.5 * (this.minX + this.maxX), .5 * (this.minY + this.maxY));
        }
        /**
         * @return {?}
         */
        extents() {
            return new Vec2((this.maxX - this.minX), (this.maxY - this.minY));
        }
        /**
         * @return {?}
         */
        min() {
            return new Vec2(this.minX, this.minY);
        }
        /**
         * @return {?}
         */
        max() {
            return new Vec2(this.maxX, this.maxY);
        }
        /**
         * @param {?} v
         * @return {?}
         */
        contains(v) {
            return v.x >= this.minX && v.x <= this.maxX &&
                v.y >= this.minY && v.y <= this.maxY;
        }
    }
    psgeometry.AABB2D = AABB2D;
    /**
     * Represents a point in 3D space using spherical coordinates.
     */
    class Spherical {
        /**
         * @param {?} r
         * @param {?} azimuth
         * @param {?} polar
         */
        constructor(r, azimuth, polar) {
            this.r = 0;
            this.azimuth = 0;
            this.polar = 0;
            this.r = r;
            this.azimuth = azimuth;
            this.polar = polar;
        }
        /**
         * Converts cartesian coordinates x,y,z to spherical coordinates.
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        static FromCartesian(x, y, z) {
            /** @type {?} */
            let r = Math.sqrt(x * x + y * y + z * z);
            return new Spherical(r, Math.asin(y / r), Math.atan2(-x, z));
        }
        /**
         * Converts cartesian vector to spherical coordinates.
         * @param {?} v
         * @return {?}
         */
        static FromCartesianVector(v) {
            return Spherical.FromCartesian(v.x, v.y, v.z);
        }
        /**
         * Converts spherical coordinates to cartesian vector.
         * @param {?} r
         * @param {?} polar
         * @param {?} azimuth
         * @return {?}
         */
        static ToCartesian(r, polar, azimuth) {
            return new Vec4(r * Math.cos(polar) * Math.sin(azimuth), -r * Math.sin(polar), -r * Math.cos(polar) * Math.cos(azimuth));
        }
        /**
         * Converts spherical coordinates to cartesian vector.
         * @return {?}
         */
        toCartesian() {
            return new Vec4(this.r * Math.cos(this.polar) * Math.sin(this.azimuth), -this.r * Math.sin(this.polar), -this.r * Math.cos(this.polar) * Math.cos(this.azimuth));
        }
    }
    psgeometry.Spherical = Spherical;
})(psgeometry || (psgeometry = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var modelstageweb;
(function (modelstageweb) {
    /**
     * @return {?}
     */
    function uuidv4() {
        /** @type {?} */
        let crypto = window.crypto || ((/** @type {?} */ (window))).msCrypto;
        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
    modelstageweb.uuidv4 = uuidv4;
    class ToolsWebGL {
        /**
         * @param {?} stage
         */
        constructor(stage) {
            this.stage = stage;
        }
        /**
         * @param {?} shaderType
         * @param {?} shaderSource
         * @return {?}
         */
        createShader(shaderType, shaderSource) {
            /** @type {?} */
            let shader = this.stage.gl.createShader(shaderType);
            this.stage.gl.shaderSource(shader, shaderSource);
            this.stage.gl.compileShader(shader);
            console.log(this.stage.gl.getShaderInfoLog(shader));
            return shader;
        }
    }
    modelstageweb.ToolsWebGL = ToolsWebGL;
    class BlockStreamBlockDescriptor {
        /**
         * @return {?}
         */
        get BlockType() {
            return this.blockType;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set BlockType(value) {
            this.blockType = value;
        }
        /**
         * @return {?}
         */
        get MajorVersion() {
            return this.majorVersion;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set MajorVersion(value) {
            this.majorVersion = value;
        }
        /**
         * @return {?}
         */
        get MinorVersion() {
            return this.minorVersion;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set MinorVersion(value) {
            this.minorVersion = value;
        }
        /**
         * @return {?}
         */
        get Flags() {
            return this.flags;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Flags(value) {
            this.flags = value;
        }
        /**
         * @return {?}
         */
        get PayloadBytes() {
            return this.payloadBytes;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set PayloadBytes(value) {
            this.payloadBytes = value;
        }
    }
    modelstageweb.BlockStreamBlockDescriptor = BlockStreamBlockDescriptor;
    let BlockStreamReaderStates;
    (function (BlockStreamReaderStates) {
        BlockStreamReaderStates[BlockStreamReaderStates["FILE_HEADER_EXPECTED"] = 0] = "FILE_HEADER_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["BLOCK_DESCRIPTOR_EXPECTED"] = 1] = "BLOCK_DESCRIPTOR_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["PAYLOAD_EXPECTED"] = 2] = "PAYLOAD_EXPECTED";
    })(BlockStreamReaderStates = modelstageweb.BlockStreamReaderStates || (modelstageweb.BlockStreamReaderStates = {}));
    class BlockStreamReader {
        /**
         * @param {?} buffer
         */
        constructor(buffer) {
            this.arrayBuffer = null;
            this.byteArray = null;
            this.currentPos = 0;
            this.blockEnd = 0;
            this.isComplete = false;
            this.fatalError = false;
            this.state = BlockStreamReaderStates.FILE_HEADER_EXPECTED;
            this.arrayBuffer = buffer;
            this.byteArray = new Uint8Array(buffer);
            this.assureFileHeader();
        }
        /**
         * @return {?}
         */
        get CurrentBlockDescriptor() {
            return this.currentBlockDescriptor;
        }
        /**
         * @return {?}
         */
        get FatalError() {
            return this.fatalError;
        }
        /**
         * @return {?}
         */
        remainingBytesInBlock() {
            return this.blockEnd - this.currentPos;
        }
        /**
         * @param {?} count
         * @return {?}
         */
        assureRemainingBytesInBlock(count) {
            return this.currentPos + count <= this.blockEnd;
        }
        /**
         * @param {?} count
         * @return {?}
         */
        readBytes(count) {
            return this.arrayBuffer.slice(this.currentPos, this.currentPos + count);
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadInt16(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(2);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256);
            }
            return result;
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadFloat(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(4);
            if (result) {
                /** @type {?} */
                let buf = new ArrayBuffer(4);
                /** @type {?} */
                let view = new DataView(buf);
                view.setUint8(0, this.byteArray[this.currentPos++]);
                view.setUint8(1, this.byteArray[this.currentPos++]);
                view.setUint8(2, this.byteArray[this.currentPos++]);
                view.setUint8(3, this.byteArray[this.currentPos++]);
                //let view = new DataView(this.byteArray.buffer, this.currentPos, 4);
                lambda(view.getFloat32(0, true));
                //this.currentPos += 4;
            }
            return result;
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadInt(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(4);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216);
            }
            return result;
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadInt64(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(8);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216 +
                    this.byteArray[this.currentPos++] * 4294967296 +
                    this.byteArray[this.currentPos++] * 1099511627776 +
                    this.byteArray[this.currentPos++] * 281474976710656 +
                    this.byteArray[this.currentPos++] * 72057594037927936);
            }
            return result;
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadString(lambda) {
            /** @type {?} */
            let result = false;
            this.tryReadInt((stringLength) => {
                /** @type {?} */
                let value = '';
                if (this.assureRemainingBytesInBlock(stringLength)) {
                    for (let i = 0; i < stringLength; ++i) {
                        value += String.fromCharCode(this.byteArray[this.currentPos++]);
                    }
                }
                lambda(value);
                result = true;
            });
            return result;
        }
        /**
         * @return {?}
         */
        readString() {
            /** @type {?} */
            let result = '';
            this.tryReadString((value) => { result = value; });
            return result;
        }
        /**
         * @return {?}
         */
        readMatrix4() {
            /** @type {?} */
            let result = new psgeometry.Matrix4();
            for (let i = 0; i < 16; ++i) {
                this.tryReadFloat((val) => { result.elements[i] = val; });
            }
            return result.transpose();
        }
        /**
         * @private
         * @param {?} startPos
         * @param {?} length
         * @return {?}
         */
        internalReadString(startPos, length) {
            /** @type {?} */
            let result = '';
            for (let i = 0; i < length; ++i) {
                result += String.fromCharCode(this.byteArray[startPos + i]);
            }
            return result;
        }
        /**
         * @private
         * @param {?} startPos
         * @return {?}
         */
        internalReadInt(startPos) {
            return this.byteArray[startPos] +
                this.byteArray[startPos + 1] * 256 +
                this.byteArray[startPos + 2] * 65536 +
                this.byteArray[startPos + 3] * 16777216;
        }
        /**
         * @private
         * @return {?}
         */
        assureFileHeader() {
            if (this.byteArray.byteLength >= 8) {
                if (this.byteArray[0] == 0x70 && // ="psblstr1"
                    this.byteArray[1] == 0x73 &&
                    this.byteArray[2] == 0x62 &&
                    this.byteArray[3] == 0x6C &&
                    this.byteArray[4] == 0x73 &&
                    this.byteArray[5] == 0x74 &&
                    this.byteArray[6] == 0x72 &&
                    this.byteArray[7] == 0x31) {
                    this.currentPos += 8;
                    this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
                }
                else {
                    this.fatalError = true;
                }
            }
            else {
                this.fatalError = this.isComplete;
            }
        }
        /**
         * @return {?}
         */
        enterBlock() {
            /** @type {?} */
            let result = { success: false, descriptor: null };
            if (this.byteArray.byteLength >= this.currentPos + 5) {
                if (this.byteArray[this.currentPos] == 0x70 && // = "psbl"
                    this.byteArray[this.currentPos + 1] == 0x73 &&
                    this.byteArray[this.currentPos + 2] == 0x62 &&
                    this.byteArray[this.currentPos + 3] == 0x6C) {
                    /** @type {?} */
                    let blockTypeLength = this.byteArray[this.currentPos + 4];
                    if (this.byteArray.byteLength >= this.currentPos + 5 + blockTypeLength + 8) {
                        // read the descriptor from stream
                        result.descriptor = new BlockStreamBlockDescriptor();
                        result.descriptor.BlockType = this.internalReadString(this.currentPos + 5, blockTypeLength);
                        result.descriptor.MajorVersion = this.byteArray[this.currentPos + 5 + blockTypeLength];
                        result.descriptor.MinorVersion = this.byteArray[this.currentPos + 5 + blockTypeLength + 1];
                        result.descriptor.Flags = this.byteArray[this.currentPos + 5 + blockTypeLength + 2] * 256 + this.byteArray[this.currentPos + 5 + blockTypeLength + 3];
                        result.descriptor.PayloadBytes = this.internalReadInt(this.currentPos + 5 + blockTypeLength + 4);
                        this.state = BlockStreamReaderStates.PAYLOAD_EXPECTED;
                        this.currentPos += 5 + blockTypeLength + 8;
                        this.blockEnd = this.currentPos + result.descriptor.PayloadBytes;
                        this.currentBlockDescriptor = result.descriptor;
                        result.success = true;
                    }
                    else {
                        // there are too few bytes to make a full block descriptor, but the stream is completely read
                        this.fatalError = this.isComplete;
                    }
                }
                else {
                    // no valid block header found
                    this.fatalError = true;
                }
            }
            else {
                // there are too few bytes to make a block header, but the stream is completely read 
                this.fatalError = this.isComplete && (this.byteArray.byteLength > this.currentPos);
            }
            return result;
        }
        /**
         * @return {?}
         */
        leaveBlock() {
            this.currentPos = this.blockEnd;
            this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
        }
    }
    modelstageweb.BlockStreamReader = BlockStreamReader;
    class ShaderInstance {
        /**
         * @param {?} shaderKey
         */
        constructor(shaderKey) {
            this.references = {};
            this.shaderKey = shaderKey;
        }
        /**
         * @return {?}
         */
        get FigureID() {
            return this.figureID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set FigureID(value) {
            this.figureID = value;
        }
        /**
         * @return {?}
         */
        get ShaderKey() {
            return this.shaderKey;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set ShaderKey(value) {
            this.shaderKey = value;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        getReference(key) {
            return this.references[key];
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        construct(reader) {
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        addReference(key, value) {
            this.references[key] = value;
        }
    }
    modelstageweb.ShaderInstance = ShaderInstance;
    class MeshShaderInstance extends ShaderInstance {
        /**
         * @param {?} shaderKey
         */
        constructor(shaderKey) {
            super(shaderKey);
            this.SIZE_OF_FLOAT = 4;
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        construct(reader) {
            if (!reader.tryReadString((id) => { this.bufferID = id; })) {
                this.bufferID = '_default';
            }
            if (!reader.tryReadInt16((priority) => { this.priority = priority; })) {
                this.priority = 0;
            }
        }
        /**
         * @return {?}
         */
        getStride() {
            return this.ShaderKey == 'TransparentMeshShader' ? 10 * this.SIZE_OF_FLOAT : 9 * this.SIZE_OF_FLOAT;
        }
    }
    modelstageweb.MeshShaderInstance = MeshShaderInstance;
    class TexturedMeshShaderInstance extends MeshShaderInstance {
        /**
         * @param {?} shaderKey
         */
        constructor(shaderKey) {
            super(shaderKey);
        }
        /**
         * @return {?}
         */
        get TextureID() {
            return this.textureID;
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        construct(reader) {
            /** @type {?} */
            let result = reader.tryReadString((textureID) => { this.textureID = textureID; });
            if (result) {
                this.addReference('TextureBuffer', this.textureID);
                super.construct(reader);
            }
        }
        /**
         * @return {?}
         */
        getStride() {
            return 11 * this.SIZE_OF_FLOAT;
        }
    }
    modelstageweb.TexturedMeshShaderInstance = TexturedMeshShaderInstance;
    /**
     * @param {?} reader
     * @return {?}
     */
    function ShaderInstanceFromReader(reader) {
        /** @type {?} */
        let result = null;
        /** @type {?} */
        let shaderKey;
        if (reader.tryReadString((key) => { shaderKey = key; })) {
            if (shaderKey == 'OpaqueMeshShader' || shaderKey == 'TransparentMeshShader') {
                result = new MeshShaderInstance(shaderKey);
            }
            else if (shaderKey == 'TexturedMeshShader') {
                result = new TexturedMeshShaderInstance(shaderKey);
            }
            if (result) {
                result.construct(reader);
            }
        }
        return result;
    }
    class Mesh3DLib {
        /**
         * @param {?} objectNamePrefix
         */
        constructor(objectNamePrefix) {
            this.objectNamePrefix = objectNamePrefix;
        }
        /**
         * @param {?} rootNode
         * @return {?}
         */
        setRootNode(rootNode) {
            this.rootNode = rootNode;
        }
        /**
         * @param {?} path
         * @return {?}
         */
        getNodeFromPath(path) {
            if (path.length == 0 || !this.rootNode || this.rootNode.Name == path) {
                return this.rootNode;
            }
            else {
                return this.rootNode.getChildNodeFromPath(path.substr(this.rootNode.Name.length));
            }
        }
    }
    modelstageweb.Mesh3DLib = Mesh3DLib;
    class AssetFactoryWebGL {
        /**
         * @param {?} stage
         */
        constructor(stage) {
            this.lastPercentage = -1;
            this.stage = stage;
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createFigure(reader, stage, assetStore) {
            this.currentFigure = new FigureWebGL(reader.readString());
            if (this.currentSceneMesh3DLib) {
                reader.tryReadString((nodePath) => {
                    this.currentFigure.Node = this.currentSceneMesh3DLib.getNodeFromPath(nodePath);
                });
            }
            assetStore.addFigure(this.currentFigure);
            return true;
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createMesh(reader, stage, assetStore) {
            /** @type {?} */
            let result = false;
            this.currentShaderInstance = ShaderInstanceFromReader(reader);
            if (this.currentShaderInstance && this.currentFigure) {
                this.currentFigure.addShaderInstance(this.currentShaderInstance);
                result = true;
            }
            return result;
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createMeshBuffer(reader, stage, assetStore) {
            /** @type {?} */
            let bufferAsset = new BufferAssetWebGL(reader, 'VertexBuffer', false);
            /** @type {?} */
            let currentID = bufferAsset.BufferID;
            /** @type {?} */
            let counter = 1;
            while (assetStore.getBufferAsset(currentID)) {
                currentID = bufferAsset.BufferID + counter++;
            }
            bufferAsset.BufferID = currentID;
            assetStore.addBufferAsset(currentID, bufferAsset);
            if (this.currentShaderInstance && this.currentFigure) ;
            bufferAsset.initialize(stage);
            if (this.currentShaderInstance) {
                this.currentShaderInstance.addReference('VertexBuffer', bufferAsset.BufferID);
            }
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createMeshIndicesBuffer(reader, stage, assetStore) {
            /** @type {?} */
            let bufferAsset = new BufferAssetWebGL(reader, 'IndexBuffer', true);
            /** @type {?} */
            let currentID = bufferAsset.BufferID;
            /** @type {?} */
            let counter = 1;
            while (assetStore.getBufferAsset(currentID)) {
                currentID = bufferAsset.BufferID + counter++;
            }
            bufferAsset.BufferID = currentID;
            assetStore.addBufferAsset(currentID, bufferAsset);
            bufferAsset.initialize(stage);
            if (this.currentShaderInstance) {
                this.currentShaderInstance.addReference('IndexBuffer', bufferAsset.BufferID);
            }
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        createTexture(reader, stage, assetStore, deferreds) {
            /** @type {?} */
            let textureName;
            /** @type {?} */
            let pixelDataSize;
            if (reader.tryReadString((value) => { textureName = value; }) && reader.tryReadInt64((value) => { pixelDataSize = value; })) {
                /** @type {?} */
                let imageData = reader.readBytes(pixelDataSize);
                /** @type {?} */
                let extension = textureName.substr(textureName.lastIndexOf('.')).toLowerCase();
                /** @type {?} */
                let imageType = 'jpeg';
                if (extension == '.png') {
                    imageType = 'png';
                }
                /** @type {?} */
                let blob = new Blob([imageData], { 'type': 'image/' + imageType });
                /** @type {?} */
                let url = URL.createObjectURL(blob);
                /** @type {?} */
                let image = new Image();
                /** @type {?} */
                let deferred = $.Deferred();
                deferreds.push(deferred);
                image.onload = () => {
                    this.stage.AssetStore.addTextureAsset(textureName, new TextureAssetWebGL(this.stage, image));
                    deferred.resolve();
                };
                image.onerror = () => {
                    console.error('Error processing texture blob ' + textureName);
                    deferred.reject();
                };
                image.src = url;
            }
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createOctree(reader, stage, assetStore) {
            this.currentFigure.setIntersector(Octree.CreateFromBlockStream(reader));
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createScene(reader, stage, assetStore) {
            this.currentSceneMesh3DLib = new Mesh3DLib(reader.readString());
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createRootNode(reader, stage, assetStore) {
            if (this.currentSceneMesh3DLib) {
                /** @type {?} */
                let rootNode = NodeAsset.FromBlockStream(reader, this.currentSceneMesh3DLib);
                this.currentSceneMesh3DLib.setRootNode(rootNode);
                this.stage.AssetStore.addRootNode(rootNode);
            }
        }
        /**
         * @private
         * @param {?} blockType
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        processBlock(blockType, reader, stage, assetStore, deferreds) {
            if (blockType == 'PSScene') {
                this.createScene(reader, stage, assetStore);
            }
            else if (blockType == 'PSFigure') {
                this.createFigure(reader, stage, assetStore);
            }
            else if (blockType == 'PSMesh') {
                this.createMesh(reader, stage, assetStore);
            }
            else if (blockType == 'PSMeshData') {
                this.createMeshBuffer(reader, stage, assetStore);
            }
            else if (blockType == 'PSMeshIndices') {
                this.createMeshIndicesBuffer(reader, stage, assetStore);
            }
            else if (blockType == 'PSTexture') {
                this.createTexture(reader, stage, assetStore, deferreds);
            }
            else if (blockType == 'PSMeshOctree') {
                this.createOctree(reader, stage, assetStore);
            }
            else if (blockType == 'PSRootNode') {
                this.createRootNode(reader, stage, assetStore);
            }
        }
        /**
         * @private
         * @param {?} buffer
         * @return {?}
         */
        loadFromArrayBuffer(buffer) {
            /** @type {?} */
            let deferreds = [];
            /** @type {?} */
            let assetStore = this.stage.AssetStore;
            /** @type {?} */
            let reader = new BlockStreamReader(buffer);
            try {
                /** @type {?} */
                let res = reader.enterBlock();
                while (res.success) {
                    this.processBlock(res.descriptor.BlockType, reader, this.stage, assetStore, deferreds);
                    reader.leaveBlock();
                    res = reader.enterBlock();
                }
            }
            catch (error) {
                console.log(JSON.stringify(error));
            }
            return $.when.apply($, deferreds);
        }
        /**
         * @param {?} url
         * @return {?}
         */
        getFromUrl(url) {
            /** @type {?} */
            let deferred = $.Deferred();
            /** @type {?} */
            let req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.responseType = 'arraybuffer';
            req.onload = (event) => {
                this.loadFromArrayBuffer((/** @type {?} */ (req.response))).done(() => {
                    deferred.resolve(true);
                });
            };
            req.onerror = (event) => {
                deferred.reject(event);
            };
            req.addEventListener('progress', (oEvent) => {
                if (oEvent.lengthComputable) {
                    /** @type {?} */
                    let percentComplete = oEvent.loaded / oEvent.total;
                    if (this.lastPercentage != Math.floor(percentComplete * 100)) {
                        this.lastPercentage = Math.floor(percentComplete * 100);
                        deferred.notify(Math.round(percentComplete * 100));
                    }
                }
            });
            req.send(null);
            return deferred;
        }
    }
    modelstageweb.AssetFactoryWebGL = AssetFactoryWebGL;
    /**
     * @record
     */
    function Intersector() { }
    modelstageweb.Intersector = Intersector;
    class BoundingBoxIntersector {
        /**
         * @param {?} boundingBox
         */
        constructor(boundingBox) {
            this.boundingBox = boundingBox;
        }
        /**
         * @return {?}
         */
        getBoundingBox() {
            return this.boundingBox;
        }
    }
    modelstageweb.BoundingBoxIntersector = BoundingBoxIntersector;
    class Octree {
        constructor() {
            this.boundingBox = new psgeometry.AABB3D();
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        static CreateFromBlockStream(reader) {
            /** @type {?} */
            let octree = new Octree();
            /** @type {?} */
            let x0;
            /** @type {?} */
            let y0;
            /** @type {?} */
            let z0;
            /** @type {?} */
            let x1;
            /** @type {?} */
            let y1;
            /** @type {?} */
            let z1;
            if (reader.tryReadInt((val) => { }) &&
                reader.tryReadFloat((val) => x0 = val) &&
                reader.tryReadFloat((val) => y0 = val) &&
                reader.tryReadFloat((val) => z0 = val) &&
                reader.tryReadFloat((val) => x1 = val) &&
                reader.tryReadFloat((val) => y1 = val) &&
                reader.tryReadFloat((val) => z1 = val)) {
                octree.boundingBox.addPoint(x0, y0, z0);
                octree.boundingBox.addPoint(x1, y1, z1);
            }
            return octree;
        }
        /**
         * @return {?}
         */
        getBoundingBox() {
            return this.boundingBox;
        }
    }
    modelstageweb.Octree = Octree;
    class FigureWebGL {
        /**
         * @param {?} figureID
         */
        constructor(figureID) {
            this.shaderInstances = [];
            this.figureID = figureID;
        }
        /**
         * @return {?}
         */
        get Node() {
            return this.node;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Node(value) {
            this.node = value;
        }
        /**
         * @return {?}
         */
        get FigureID() {
            return this.figureID;
        }
        /**
         * @return {?}
         */
        get ShaderInstances() {
            return this.shaderInstances;
        }
        /**
         * @return {?}
         */
        getBoundingBox() {
            if (this.intersector) {
                return this.Node ? this.intersector.getBoundingBox().transform(this.Node.AbsoluteTransformation) : this.intersector.getBoundingBox();
            }
            else {
                return new psgeometry.AABB3D();
            }
        }
        /**
         * @param {?} shaderInstance
         * @return {?}
         */
        addShaderInstance(shaderInstance) {
            this.shaderInstances.push(shaderInstance);
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            /** @type {?} */
            let stage = context.Stage;
            this.shaderInstances.forEach((shaderInstance) => {
                shaderInstance.FigureID = this.figureID;
                /** @type {?} */
                let shaderProgram = stage.getShaderProgram(context, shaderInstance.ShaderKey);
                if (shaderProgram) {
                    context.ShaderProgram = shaderProgram;
                    context.NodeTransform = this.Node ? this.Node.AbsoluteTransformation : null;
                    shaderProgram.render(context, shaderInstance);
                }
            });
        }
        /**
         * @param {?} intersector
         * @return {?}
         */
        setIntersector(intersector) {
            this.intersector = intersector;
        }
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        intersectsBoundingBox(ray, at) {
            /** @type {?} */
            let result = false;
            if (this.intersector) {
                /** @type {?} */
                let intersectionPoint = this.intersector.getBoundingBox().intersectsRay(ray);
                if (intersectionPoint) {
                    at.assignVec(intersectionPoint);
                    result = true;
                }
            }
            return result;
        }
    }
    modelstageweb.FigureWebGL = FigureWebGL;
    class AnimationTransformation {
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        static FromBlockStream(reader, mesh3DLib) {
            return null;
        }
    }
    modelstageweb.AnimationTransformation = AnimationTransformation;
    class NodeAsset {
        constructor() {
            this.childNodes = {};
        }
        /**
         * @return {?}
         */
        get Name() {
            return this.name;
        }
        /**
         * @return {?}
         */
        get AbsoluteTransformation() {
            return this.absoluteTransformation;
        }
        /**
         * @return {?}
         */
        get LocalTransformation() {
            return this.localTransformation;
        }
        /**
         * @param {?} path
         * @return {?}
         */
        getChildNodeFromPath(path) {
            for (let child in this.childNodes) {
                if (path == this.childNodes[child].Name) {
                    return this.childNodes[child];
                }
            }
            for (let child in this.childNodes) {
                if (path.substring(0, this.childNodes[child].Name.length) == this.childNodes[child].Name) {
                    return this.childNodes[child].getChildNodeFromPath(path.substr(this.childNodes[child].Name.length));
                }
            }
            return null;
        }
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @param {?=} parentNode
         * @return {?}
         */
        static FromBlockStream(reader, mesh3DLib, parentNode) {
            /** @type {?} */
            let result = new NodeAsset();
            result.name = reader.readString();
            result.localTransformation = reader.readMatrix4();
            result.absoluteTransformation = NodeAsset.calculateAbsoluteTransformation(result.localTransformation, parentNode);
            result.parentNode = parentNode;
            result.readChildNodes(reader, mesh3DLib);
            result.readAnimationTransformations(reader, mesh3DLib);
            return result;
        }
        /**
         * @private
         * @param {?} localTransformation
         * @param {?} parentNode
         * @return {?}
         */
        static calculateAbsoluteTransformation(localTransformation, parentNode) {
            if (parentNode) {
                return (/** @type {?} */ (localTransformation.multiply(parentNode.AbsoluteTransformation)));
            }
            else {
                return localTransformation;
            }
        }
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        readChildNodes(reader, mesh3DLib) {
            reader.tryReadInt((childNameCount) => {
                for (let i = 0; i < childNameCount; ++i) {
                    this.addChildNode(NodeAsset.FromBlockStream(reader, mesh3DLib, this));
                }
            });
        }
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        readAnimationTransformations(reader, mesh3DLib) {
            reader.tryReadInt((numAnimationTransformations) => {
                for (let i = 0; i < numAnimationTransformations; ++i) {
                    this.addAnimationTransformation(AnimationTransformation.FromBlockStream(reader, mesh3DLib));
                }
            });
        }
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        addChildNode(node) {
            this.childNodes[node.Name] = node;
        }
        /**
         * @private
         * @param {?} animationTransformation
         * @return {?}
         */
        addAnimationTransformation(animationTransformation) {
        }
    }
    modelstageweb.NodeAsset = NodeAsset;
    class BufferAssetWebGL {
        /**
         * @param {?} reader
         * @param {?} bufferID
         * @param {?} isElementBuffer
         */
        constructor(reader, bufferID, isElementBuffer) {
            this.bufferSize = 0;
            this.isElementBuffer = false;
            this.bufferID = bufferID;
            this.isElementBuffer = isElementBuffer;
            if (reader) {
                /** @type {?} */
                let descriptor = reader.CurrentBlockDescriptor;
                if (descriptor) {
                    // read additional meta data if available
                    if (descriptor.MajorVersion > 1) {
                        this.bufferID = reader.readString();
                    }
                    this.bufferSize = reader.remainingBytesInBlock();
                    this.bufferData = reader.readBytes(this.bufferSize);
                }
            }
        }
        /**
         * @return {?}
         */
        get BufferID() {
            return this.bufferID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set BufferID(value) {
            this.bufferID = value;
        }
        /**
         * @return {?}
         */
        get Buffer() {
            return this.webGLBuffer;
        }
        /**
         * @return {?}
         */
        get BufferSize() {
            return this.bufferSize;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set BufferSize(value) {
            this.bufferSize = value;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            this.webGLBuffer = stage.gl.createBuffer();
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ELEMENT_ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        bind(stage) {
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
            }
        }
        /**
         * @param {?} stage
         * @param {?} attributeLocation
         * @param {?} size
         * @param {?} stride
         * @param {?} offset
         * @return {?}
         */
        bindInterleaved(stage, attributeLocation, size, stride, offset) {
            if (attributeLocation >= 0) {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.enableVertexAttribArray(attributeLocation);
                stage.gl.vertexAttribPointer(attributeLocation, size, stage.gl.FLOAT, false, stride, offset);
            }
        }
    }
    modelstageweb.BufferAssetWebGL = BufferAssetWebGL;
    class OpaqueMeshBuilder {
        constructor() {
            this.vertices = [];
            this.indices = [];
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} doubleSided
         * @return {?}
         */
        addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, x1, y1, z1, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
            /** @type {?} */
            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (doubleSided) {
                this.vertices.push(x1, y1, z1, 0, 0, 1, r, g, b, x0, y0, z0, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
                i = this.indices.length;
                this.indices.push(i, i + 1, i + 2);
            }
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} x3
         * @param {?} y3
         * @param {?} z3
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} doubleSided
         * @return {?}
         */
        addQuad(x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided);
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @return {?}
         */
        addStroke(x0, y0, z0, x1, y1, z1, r, g, b) {
            /** @type {?} */
            let dir = new psgeometry.Vec3(x1, y1, z1).sub(new psgeometry.Vec3(x0, y0, z0));
            /** @type {?} */
            let radius = dir.norm();
            /** @type {?} */
            let azimuth = Math.atan2(-dir.z, dir.x);
            /** @type {?} */
            let polar = Math.asin(dir.y / radius);
            /** @type {?} */
            let thickness = .01;
            /** @type {?} */
            let up = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, thickness, 0, 1))));
            /** @type {?} */
            let front = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, 0, thickness, 1))));
            this.addQuad(x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, r, g, b);
            this.addQuad(x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, r, g, b);
            this.addQuad(x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, r, g, b);
            this.addQuad(x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, r, g, b);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            /** @type {?} */
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 9 * 4;
            /** @type {?} */
            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
        /**
         * @param {?} stage
         * @param {?} figureID
         * @return {?}
         */
        createFigure(stage, figureID) {
            this.indBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_indices', true);
            this.vertBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_vertices', false);
            this.initialize(stage);
            stage.AssetStore.addBufferAsset(figureID + '_indices', this.indBufferAsset);
            stage.AssetStore.addBufferAsset(figureID + '_vertices', this.vertBufferAsset);
            /** @type {?} */
            let shaderInstance = new modelstageweb.MeshShaderInstance('OpaqueMeshShader');
            shaderInstance.addReference('IndexBuffer', figureID + '_indices');
            shaderInstance.addReference('VertexBuffer', figureID + '_vertices');
            /** @type {?} */
            let figure = new modelstageweb.FigureWebGL(figureID);
            figure.addShaderInstance(shaderInstance);
            return figure;
        }
    }
    modelstageweb.OpaqueMeshBuilder = OpaqueMeshBuilder;
    class TransparentMeshBuilder {
        /**
         * @param {?} vertBufferAsset
         * @param {?} indBufferAsset
         */
        constructor(vertBufferAsset, indBufferAsset) {
            this.vertBufferAsset = vertBufferAsset;
            this.indBufferAsset = indBufferAsset;
            this.vertices = [];
            this.indices = [];
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?} a
         * @param {?=} twoSided
         * @return {?}
         */
        addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, a, x1, y1, z1, 0, 0, 1, r, g, b, a, x2, y2, z2, 0, 0, 1, r, g, b, a);
            /** @type {?} */
            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, x2, y2, z2, x1, y1, z1, r, g, b, a);
            }
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} x3
         * @param {?} y3
         * @param {?} z3
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?} a
         * @param {?=} twoSided
         * @return {?}
         */
        addQuad(x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            /** @type {?} */
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 10 * 4;
            /** @type {?} */
            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
    }
    modelstageweb.TransparentMeshBuilder = TransparentMeshBuilder;
    class TexturedMeshBuilder {
        /**
         * @param {?} vertBufferAsset
         * @param {?} indBufferAsset
         */
        constructor(vertBufferAsset, indBufferAsset) {
            this.vertBufferAsset = vertBufferAsset;
            this.indBufferAsset = indBufferAsset;
            this.vertices = [];
            this.indices = [];
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} u0
         * @param {?} v0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} u1
         * @param {?} v1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} u2
         * @param {?} v2
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} twoSided
         * @return {?}
         */
        addTri(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, u0, v0, x1, y1, z1, 0, 0, 1, r, g, b, u1, v1, x2, y2, z2, 0, 0, 1, r, g, b, u2, v2);
            /** @type {?} */
            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x1, y1, z1, u1, v1, r, g, b);
            }
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} u0
         * @param {?} v0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} u1
         * @param {?} v1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} u2
         * @param {?} v2
         * @param {?} x3
         * @param {?} y3
         * @param {?} z3
         * @param {?} u3
         * @param {?} v3
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} twoSided
         * @return {?}
         */
        addQuad(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided) {
            this.addTri(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided);
            this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            /** @type {?} */
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 11 * 4;
            /** @type {?} */
            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
    }
    modelstageweb.TexturedMeshBuilder = TexturedMeshBuilder;
    class TextureAssetWebGL {
        /**
         * @param {?} stage
         * @param {?} image
         */
        constructor(stage, image) {
            if (image instanceof WebGLTexture) {
                this.texture = image;
            }
            else {
                this.texture = stage.gl.createTexture();
                stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
                stage.gl.texImage2D(stage.gl.TEXTURE_2D, 0, stage.gl.RGBA, stage.gl.RGBA, stage.gl.UNSIGNED_BYTE, image);
                stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MAG_FILTER, stage.gl.LINEAR);
                stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MIN_FILTER, stage.gl.LINEAR_MIPMAP_NEAREST);
                stage.gl.generateMipmap(stage.gl.TEXTURE_2D);
                stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
            }
        }
        /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        bind(stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.uniform1i(stage.gl.getUniformLocation(program.Program, attributeName), 0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
        }
        /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        unbind(stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
        }
    }
    modelstageweb.TextureAssetWebGL = TextureAssetWebGL;
    /// An asset store class for WebGL.
    class AssetStoreWebGL {
        constructor() {
            /// All aggregated figures.
            this.figures = {};
            /// All aggregated nodes assets.
            this.rootNodeAssets = {};
            /// All aggregated buffer assets.
            this.bufferAssets = {};
            /// All aggregated texture assets.
            this.textureAssets = {};
        }
        /// Adds the specified figure to the the store.
        /**
         * @param {?} figure
         * @return {?}
         */
        addFigure(figure) {
            this.figures[figure.FigureID] = figure;
        }
        /// Determines the figure with the the specified id.
        /**
         * @param {?} figureID
         * @return {?}
         */
        getFigure(figureID) {
            return this.figures[figureID];
        }
        /// Adds a buffer asset to the store.
        /**
         * @param {?} bufferAssetID
         * @param {?} bufferAsset
         * @return {?}
         */
        addBufferAsset(bufferAssetID, bufferAsset) {
            this.bufferAssets[bufferAssetID] = bufferAsset;
        }
        /**
         * @param {?} node
         * @return {?}
         */
        addRootNode(node) {
            this.rootNodeAssets[node.Name] = node;
        }
        /// Determines the buffer asset with the specified id.
        /**
         * @param {?} bufferAssetID
         * @return {?}
         */
        getBufferAsset(bufferAssetID) {
            return this.bufferAssets[bufferAssetID];
        }
        /// Adds a texture asset to the store.
        /**
         * @param {?} textureAssetID
         * @param {?} textureAsset
         * @return {?}
         */
        addTextureAsset(textureAssetID, textureAsset) {
            this.textureAssets[textureAssetID] = textureAsset;
        }
        /// Determines the texture asset with the specified id.
        /**
         * @param {?} textureAssetID
         * @return {?}
         */
        getTextureAsset(textureAssetID) {
            return this.textureAssets[textureAssetID];
        }
        /// Returns the map of aggregated figures.
        /**
         * @return {?}
         */
        get Figures() {
            return this.figures;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        getRootNode(name) {
            return this.rootNodeAssets[name];
        }
    }
    modelstageweb.AssetStoreWebGL = AssetStoreWebGL;
    /**
     * @record
     */
    function SceneItemFilterWebGL() { }
    modelstageweb.SceneItemFilterWebGL = SceneItemFilterWebGL;
    class GenericSceneItemFilterWebGL {
        /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        passes(sceneItem, context) {
            return context.Phase != 'Shadow';
        }
    }
    modelstageweb.GenericSceneItemFilterWebGL = GenericSceneItemFilterWebGL;
    class SceneItemWebGL {
        /**
         * @param {?} scene
         * @param {?} sceneItemID
         * @param {?=} isVisible
         * @param {?=} testIntersection
         * @param {?=} childrenVisible
         * @param {?=} testChildrenIntersection
         */
        constructor(scene, sceneItemID, isVisible, testIntersection, childrenVisible, testChildrenIntersection) {
            this.children = [];
            this.childrenByKey = {};
            this.data = {};
            this.scene = scene;
            this.sceneItemID = sceneItemID;
            this.isVisible = isVisible || typeof isVisible === 'undefined';
            this.childrenVisible = childrenVisible || typeof childrenVisible === 'undefined';
            this.testIntersection = testIntersection || typeof testIntersection === 'undefined';
            this.testChildrenIntersection = testChildrenIntersection || typeof testChildrenIntersection === 'undefined';
        }
        /**
         * @return {?}
         */
        get Data() {
            return this.data;
        }
        /**
         * @return {?}
         */
        get Scene() {
            return this.scene;
        }
        /**
         * @return {?}
         */
        get SceneItemID() {
            return this.sceneItemID;
        }
        /**
         * @return {?}
         */
        get Children() {
            return this.children;
        }
        /**
         * @return {?}
         */
        get TestChildrenIntersection() {
            return this.testChildrenIntersection;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set TestChildrenIntersection(val) {
            this.testChildrenIntersection = val;
        }
        /**
         * @return {?}
         */
        get TestIntersection() {
            return this.testIntersection;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set TestIntersection(val) {
            this.testIntersection = val;
        }
        /**
         * @return {?}
         */
        get Filter() { return this.filter; }
        /**
         * @param {?} value
         * @return {?}
         */
        set Filter(value) {
            this.filter = value;
        }
        /**
         * @param {?} sceneItem
         * @return {?}
         */
        addChild(sceneItem) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.push(sceneItem);
            sceneItem.addedToSceneGraph(this);
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        getChild(sceneItemID) {
            return this.childrenByKey[sceneItemID];
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        removeChild(sceneItemID) {
            this.children = this.children.filter(sceneItem => sceneItem.sceneItemID != sceneItemID);
            delete this.childrenByKey[sceneItemID];
        }
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @return {?}
         */
        insertChild(sceneItem, index) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.splice(index, 0, sceneItem);
            sceneItem.addedToSceneGraph(this);
        }
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        beginRender(context) {
        }
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        endRender(context) {
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            if (!this.filter || this.filter.passes(this, context)) {
                if (this.isVisible) {
                    this.beginRender(context);
                    this.renderChildren(context);
                    this.endRender(context);
                }
                else {
                    this.renderChildren(context);
                }
            }
        }
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        renderChildren(context) {
            if (this.childrenVisible) {
                this.children.forEach((child) => {
                    child.render(context);
                });
            }
        }
        /**
         * @param {?} parentSceneItem
         * @return {?}
         */
        addedToSceneGraph(parentSceneItem) {
            this.scene = parentSceneItem.scene;
            this.parent = parentSceneItem;
        }
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        intersectsBoundingBox(ray, at) {
            return false;
        }
        /**
         * @protected
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        isIntersectionCandidate(ray, at) {
            return this.intersectsBoundingBox(ray, at);
        }
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        addIntersectionCandidates(ray, candidates) {
            if (this.testIntersection) {
                /** @type {?} */
                let at = new psgeometry.Vec3();
                if (this.isIntersectionCandidate(ray, at)) {
                    candidates.push(new IntersectionCandidate(this, at.squaredDist(ray.p0.asVec3())));
                }
            }
            if (this.testChildrenIntersection) {
                for (let i in this.children) {
                    this.children[i].addIntersectionCandidates(ray, candidates);
                }
            }
        }
    }
    modelstageweb.SceneItemWebGL = SceneItemWebGL;
    class ActorWebGL extends SceneItemWebGL {
        /**
         * @param {?} scene
         * @param {?} actorID
         */
        constructor(scene, actorID) {
            super(scene, actorID);
            this.figures = [];
            this.state = new RenderState();
        }
        /**
         * @return {?}
         */
        get State() {
            return this.state;
        }
        /**
         * @return {?}
         */
        get Figures() {
            return this.figures;
        }
        /**
         * @param {?} figure
         * @return {?}
         */
        addFigure(figure) {
            this.figures.push(figure);
        }
        /**
         * @param {?} context
         * @return {?}
         */
        beginRender(context) {
            this.figures.forEach((figure) => {
                figure.render(context);
            });
        }
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        intersectsBoundingBox(ray, at) {
            /** @type {?} */
            let transformedRay = this.inverseModelTransform ? ray.transform(this.inverseModelTransform) : ray;
            /** @type {?} */
            let result = false;
            for (let figureIdx in this.figures) {
                if (!result) {
                    result = this.figures[figureIdx].intersectsBoundingBox(transformedRay, at);
                    if (result) {
                        at.assignVec((/** @type {?} */ (this.lastModelTransform.multiply(at.asVec4()))));
                    }
                }
            }
            return result;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            if (!this.filter || this.filter.passes(this, context)) {
                if (this.isVisible || this.childrenVisible) {
                    context.pushState(this.state);
                    if (this.isVisible) {
                        this.beginRender(context);
                        this.renderChildren(context);
                        this.endRender(context);
                    }
                    else {
                        this.renderChildren(context);
                    }
                    /** @type {?} */
                    let modelTransform = context.NodeTransform ? (/** @type {?} */ (context.NodeTransform.multiply(context.ModelTransform))) : context.ModelTransform;
                    if (!modelTransform.equals(this.lastModelTransform)) {
                        this.inverseModelTransform = modelTransform.inverse();
                        this.lastModelTransform = modelTransform;
                    }
                    context.popState();
                }
            }
        }
    }
    modelstageweb.ActorWebGL = ActorWebGL;
    class IntersectionCandidate {
        /**
         * @param {?} sceneItem
         * @param {?} squaredDist
         */
        constructor(sceneItem, squaredDist) {
            this.squaredDist = Infinity;
            this.sceneItem = sceneItem;
            this.squaredDist = squaredDist;
        }
        /**
         * @param {?} intersectionCandidate
         * @return {?}
         */
        compare(intersectionCandidate) {
            return this.squaredDist < intersectionCandidate.squaredDist ? -1 :
                (this.squaredDist > intersectionCandidate.squaredDist ? 1 : 0);
        }
    }
    modelstageweb.IntersectionCandidate = IntersectionCandidate;
    class RenderState {
        constructor() {
            this.entries = {};
        }
        /**
         * @return {?}
         */
        get Parent() {
            return this.parent;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set Parent(val) {
            this.parent = val;
        }
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        evaluate(entry) {
            return typeof entry == 'function' ? entry(this) : entry;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        contains(key) {
            return this.entries[key] != undefined;
        }
        /**
         * @template T
         * @param {?} key
         * @param {?} defaultValue
         * @return {?}
         */
        get(key, defaultValue) {
            /** @type {?} */
            let result = defaultValue;
            this.tryGet(key, (val) => { result = val; });
            return result;
        }
        /**
         * @param {?} key
         * @param {?} lambda
         * @return {?}
         */
        tryGet(key, lambda) {
            if (this.contains(key)) {
                lambda(this.evaluate(this.entries[key]));
                return true;
            }
            else {
                return this.parent == null ? false : this.parent.tryGet(key, lambda);
            }
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        set(key, value) {
            this.entries[key] = value;
        }
    }
    modelstageweb.RenderState = RenderState;
    class SceneWebGL {
        constructor() {
            this.isInitialized = false;
            this.sceneHierarchy = new SceneItemWebGL(this, '');
            this.dirty = true;
            this.state = new RenderState();
        }
        /**
         * @return {?}
         */
        get SceneHierarchy() {
            return this.sceneHierarchy;
        }
        /**
         * @return {?}
         */
        get IsInitialized() {
            return this.isInitialized;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set IsInitialized(value) {
            this.isInitialized = value;
        }
        /**
         * @return {?}
         */
        get State() {
            return this.state;
        }
        /**
         * @return {?}
         */
        initialize() {
        }
        /**
         * @return {?}
         */
        setDirty() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        isDirty() {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            if (this.isInitialized) {
                context.SceneCategory = this.getSceneCategory();
                // updateRunningSequences(context);
                context.pushState(this.state);
                this.sceneHierarchy.render(context);
                context.popState();
            }
        }
        /**
         * @param {?} sceneItem
         * @param {?} makeVisible
         * @return {?}
         */
        addSceneItem(sceneItem, makeVisible) {
            this.sceneHierarchy.addChild(sceneItem);
            this.setDirty();
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        getSceneItem(sceneItemID) {
            return this.sceneHierarchy.getChild(sceneItemID);
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        removeSceneItem(sceneItemID) {
            this.sceneHierarchy.removeChild(sceneItemID);
            this.setDirty();
        }
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @param {?} makeVisible
         * @return {?}
         */
        insertSceneItem(sceneItem, index, makeVisible) {
            this.sceneHierarchy.insertChild(sceneItem, index);
            this.setDirty();
        }
        /**
         * @protected
         * @return {?}
         */
        getSceneCategory() {
            return '';
        }
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        getIntersectionCandidates(ray, candidates) {
            this.sceneHierarchy.addIntersectionCandidates(ray, candidates);
            candidates.sort((a, b) => { return a.compare(b); });
        }
        /**
         * @return {?}
         */
        beginFrame() { }
        /**
         * Update is called periodically (once per frame) to allow updating the state of the scene.
         * @return {?}
         */
        update() { }
        /**
         * @return {?}
         */
        endFrame() { }
    }
    modelstageweb.SceneWebGL = SceneWebGL;
    class Camera {
        constructor() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        get ProjectionMatrix() { return this.projectionMatrix; }
        /**
         * @return {?}
         */
        get ViewMatrix() { return this.viewMatrix; }
        /**
         * @protected
         * @return {?}
         */
        setDirty() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        isDirty() {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * @param {?} eye
         * @param {?} center
         * @param {?} up
         * @return {?}
         */
        createViewMatrix(eye, center, up) {
            /** @type {?} */
            let z = eye.sub(center).normalize();
            /** @type {?} */
            let x = up.cross(z).normalize();
            /** @type {?} */
            let y = z.cross(x).normalize();
            /** @type {?} */
            let m = new psgeometry.Matrix4([x.x, x.y, x.z, 0,
                y.x, y.y, y.z, 0,
                z.x, z.y, z.z, 0,
                0, 0, 0, 1]);
            /** @type {?} */
            let t = new psgeometry.Matrix4([1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1]);
            return (/** @type {?} */ (t.multiply(m)));
        }
        /**
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        createPerspectiveMatrix(fovy, aspect, znear, zfar) {
            /** @type {?} */
            let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
            /** @type {?} */
            let ymin = -ymax;
            /** @type {?} */
            let xmin = ymin * aspect;
            /** @type {?} */
            let xmax = ymax * aspect;
            return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
        }
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} near
         * @param {?} far
         * @return {?}
         */
        createOrthographicMatrix(left, right, bottom, top, near, far) {
            return new psgeometry.Matrix4([
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, 2 / (near - far), 0,
                (left + right) / (left - right),
                (bottom + top) / (bottom - top),
                (near + far) / (near - far),
                1,
            ]);
        }
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        makeFrustum(left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            let X = 2 * znear / (right - left);
            /** @type {?} */
            let Y = 2 * znear / (top - bottom);
            /** @type {?} */
            let A = (right + left) / (right - left);
            /** @type {?} */
            let B = (top + bottom) / (top - bottom);
            /** @type {?} */
            let C = -(zfar + znear) / (zfar - znear);
            /** @type {?} */
            let D = -2 * zfar * znear / (zfar - znear);
            return new psgeometry.Matrix4([
                X, 0, A, 0,
                0, Y, B, 0,
                0, 0, C, D,
                0, 0, -1, 0
            ]);
        }
    }
    modelstageweb.Camera = Camera;
    class ShadowCameraWebGL extends Camera {
        constructor() {
            super(...arguments);
            this.shadowMapWidth = 1024;
            this.shadowMapHeight = 1024;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        resize(stage) {
            this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.update(new psgeometry.Vec3(0, 10, 0), new psgeometry.Vec3(0, 0, 0), new psgeometry.Vec3(0, 0, -1));
            this.shadowFramebuffer = stage.gl.createFramebuffer();
            this.shadowDepthTexture = stage.gl.createTexture();
            this.renderBuffer = stage.gl.createRenderbuffer();
            /** @type {?} */
            let shadowTexture = new TextureAssetWebGL(stage, this.shadowDepthTexture);
            stage.AssetStore.addTextureAsset('Shadow', shadowTexture);
            stage.gl.bindFramebuffer(stage.gl.FRAMEBUFFER, this.shadowFramebuffer);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.shadowDepthTexture);
            stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MAG_FILTER, stage.gl.LINEAR);
            stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MIN_FILTER, stage.gl.LINEAR);
            stage.gl.texImage2D(stage.gl.TEXTURE_2D, 0, stage.gl.RGBA, this.shadowMapWidth, this.shadowMapHeight, 0, stage.gl.RGBA, stage.gl.UNSIGNED_BYTE, null);
            stage.gl.bindRenderbuffer(stage.gl.RENDERBUFFER, this.renderBuffer);
            stage.gl.renderbufferStorage(stage.gl.RENDERBUFFER, stage.gl.DEPTH_COMPONENT16, this.shadowMapWidth, this.shadowMapHeight);
            stage.gl.framebufferTexture2D(stage.gl.FRAMEBUFFER, stage.gl.COLOR_ATTACHMENT0, stage.gl.TEXTURE_2D, this.shadowDepthTexture, 0);
            stage.gl.framebufferRenderbuffer(stage.gl.FRAMEBUFFER, stage.gl.DEPTH_ATTACHMENT, stage.gl.RENDERBUFFER, this.renderBuffer);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
            stage.gl.bindRenderbuffer(stage.gl.RENDERBUFFER, null);
        }
        /**
         * @param {?} bbox
         * @return {?}
         */
        updateShadowArea(bbox) {
            /** @type {?} */
            var center = bbox.center();
            /** @type {?} */
            var extents = bbox.extents();
            this.projectionMatrix = this.createOrthographicMatrix(-extents.x / 2, extents.x / 2, -extents.y / 2, extents.y / 2, -30, 30);
            this.update(new psgeometry.Vec3(center.x, 10, center.y), new psgeometry.Vec3(center.x, 0, center.y), new psgeometry.Vec3(0, 0, -1));
            this.setDirty();
        }
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        update(pos, lookAt, up) {
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.setDirty();
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        beginRender(stage) {
            stage.gl.bindFramebuffer(stage.gl.FRAMEBUFFER, this.shadowFramebuffer);
            // Set the viewport to match
            stage.gl.viewport(0, 0, this.shadowMapWidth, this.shadowMapHeight);
            stage.gl.clearColor(0.2, 0.2, 0.2, 0.0);
            stage.gl.clearDepth(0.0);
            stage.gl.clear(stage.gl.COLOR_BUFFER_BIT | stage.gl.DEPTH_BUFFER_BIT);
            stage.gl.enable(stage.gl.DEPTH_TEST);
            stage.gl.enable(stage.gl.CULL_FACE);
            stage.gl.frontFace(stage.gl.CCW);
            stage.gl.cullFace(stage.gl.BACK);
            stage.gl.depthFunc(stage.gl.GEQUAL);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        endRender(stage) {
        }
    }
    modelstageweb.ShadowCameraWebGL = ShadowCameraWebGL;
    class CameraWebGL extends Camera {
        constructor() {
            super(...arguments);
            this.clientWidth = 1.0;
            this.clientHeight = 1.0;
        }
        /**
         * @return {?}
         */
        get ProjectionMatrix() {
            return this.projectionMatrix;
        }
        /**
         * @return {?}
         */
        get ViewMatrix() {
            return this.viewMatrix;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        resize(stage) {
            /** @type {?} */
            let realToCSSPixels = window.devicePixelRatio || 1;
            this.clientWidth = stage.gl.canvas.clientWidth;
            this.clientHeight = stage.gl.canvas.clientHeight;
            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            /** @type {?} */
            let displayWidth = Math.floor(stage.gl.canvas.clientWidth * realToCSSPixels);
            /** @type {?} */
            let displayHeight = Math.floor(stage.gl.canvas.clientHeight * realToCSSPixels);
            // Make the canvas the same size
            stage.gl.canvas.width = displayWidth / realToCSSPixels;
            stage.gl.canvas.height = displayHeight / realToCSSPixels;
            this.projectionMatrix = this.createPerspectiveMatrix(45.0, stage.gl.canvas.clientWidth / stage.gl.canvas.clientHeight, 0.1, 200.0);
            //this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.inverseProjectionMatrix = this.projectionMatrix.inverse();
            //this.viewMatrix = this.createViewMatrix(new psgeometry.Vec3(0.0, 1.8, 15.0), new psgeometry.Vec3(0.0, 0.0, 0.0), new psgeometry.Vec3(0.0, 1.0, 0.0));
            this.setDirty();
        }
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        update(pos, lookAt, up) {
            this.currentCameraPos = pos;
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.inverseViewMatrix = this.viewMatrix.inverse();
            this.setDirty();
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        beginRender(stage) {
            // Set the viewport to match
            stage.gl.viewport(0, 0, stage.gl.canvas.clientWidth, stage.gl.canvas.clientHeight);
            stage.gl.bindFramebuffer(stage.gl.FRAMEBUFFER, null);
            stage.gl.clearColor(0.3, 0.3, 0.3, 1.0);
            stage.gl.clearDepth(1.0);
            stage.gl.clear(stage.gl.DEPTH_BUFFER_BIT); // stage.gl.COLOR_BUFFER_BIT | 
            stage.gl.enable(stage.gl.DEPTH_TEST);
            stage.gl.enable(stage.gl.CULL_FACE);
            stage.gl.frontFace(stage.gl.CCW);
            stage.gl.cullFace(stage.gl.BACK);
            stage.gl.depthFunc(stage.gl.LEQUAL);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        endRender(stage) {
        }
        /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        getViewRay(clientX, clientY) {
            /** @type {?} */
            let cursor = new psgeometry.Vec4(clientX / this.clientWidth * 2.0 - 1.0, 1.0 - clientY / this.clientHeight * 2.0, -1.0, 1.0);
            /** @type {?} */
            let direction = (/** @type {?} */ (this.inverseProjectionMatrix.multiply(cursor)));
            direction.w = 1.0;
            /** @type {?} */
            let forward = this.inverseViewMatrix.multiply(direction);
            return new psgeometry.Line3D(this.currentCameraPos, forward);
        }
    }
    modelstageweb.CameraWebGL = CameraWebGL;
    class ShaderProgramWebGL {
        constructor() {
            this.isInitialized = false;
            this.SIZE_OF_FLOAT = 4;
        }
        /**
         * @return {?}
         */
        get Program() {
            return this.program;
        }
        /**
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        render(context, shaderInstance) {
            if (this.isInitialized && this.beginRender(context, shaderInstance)) {
                context.Stage.applyState(context);
                this.internalRender(context, shaderInstance);
                this.endRender(context, shaderInstance);
            }
        }
        /**
         * @protected
         * @param {?} stage
         * @param {?} attribName
         * @return {?}
         */
        getAttribLocation(stage, attribName) {
            return stage.gl.getAttribLocation(this.program, attribName);
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        beginRender(context, shaderInstance) {
            context.Stage.gl.useProgram(this.program);
            return true;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        endRender(context, shaderInstance) {
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            this.vertexShader = stage.Tools.createShader(stage.gl.VERTEX_SHADER, this.getVertexShaderSrc());
            this.fragmentShader = stage.Tools.createShader(stage.gl.FRAGMENT_SHADER, this.getFragmentShaderSrc());
            this.program = stage.gl.createProgram();
            stage.gl.attachShader(this.program, this.vertexShader);
            stage.gl.attachShader(this.program, this.fragmentShader);
            stage.gl.linkProgram(this.program);
            stage.gl.detachShader(this.program, this.vertexShader);
            stage.gl.detachShader(this.program, this.fragmentShader);
            console.log(stage.gl.getProgramInfoLog(this.program));
            this.isInitialized = true;
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            return '';
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return '';
        }
    }
    modelstageweb.ShaderProgramWebGL = ShaderProgramWebGL;
    class OpaqueMeshShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 9;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                // draw triangles
                /** @type {?} */
                let triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            return `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;

                varying mediump vec4 vColor;

                void main()
                {
                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);
                   vec3 normal = aNormal;
                   vec4 diffuseColor = vec4(aColor, 1.0);
                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);

                   vec3 lightDir = vec3(0.9, 0.7, 1.0);
                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);

                   vColor = vec4((aColor * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), 1.0);
                }`;
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return `varying mediump vec4 vColor;

                void main()
                {
                   gl_FragColor = vColor;
                }`;
        }
    }
    modelstageweb.OpaqueMeshShaderProgramWebGL = OpaqueMeshShaderProgramWebGL;
    class TransparentMeshShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 10;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 4, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                stage.gl.enable(stage.gl.BLEND);
                stage.gl.blendFunc(stage.gl.SRC_ALPHA, stage.gl.ONE_MINUS_SRC_ALPHA);
                stage.gl.depthMask(false);
                // draw triangles
                /** @type {?} */
                let triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                stage.gl.depthMask(true);
                stage.gl.disable(stage.gl.BLEND);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            return `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec4 aColor;

                varying mediump vec4 vColor;

                void main()
                {
                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);
                   vec3 normal = aNormal;
                   vec4 diffuseColor = aColor;
                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);

                   vec3 lightDir = vec3(0.9, 0.7, 1.0);
                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);

                   vColor = vec4((aColor.rgb * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), aColor.a);
                }`;
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return `varying mediump vec4 vColor;

                void main()
                {
                   gl_FragColor = vColor;
                }`;
        }
    }
    modelstageweb.TransparentMeshShaderProgramWebGL = TransparentMeshShaderProgramWebGL;
    let TexturedMeshShaderProgramVariants;
    (function (TexturedMeshShaderProgramVariants) {
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Diffuse"] = 0] = "Diffuse";
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Matcap"] = 1] = "Matcap";
    })(TexturedMeshShaderProgramVariants = modelstageweb.TexturedMeshShaderProgramVariants || (modelstageweb.TexturedMeshShaderProgramVariants = {}));
    class TexturedMeshShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @param {?=} variant
         */
        constructor(variant = TexturedMeshShaderProgramVariants.Diffuse) {
            super();
            this.variant = variant;
        }
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 11;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                let textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                let textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    // draw triangles
                    /** @type {?} */
                    let triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            /** @type {?} */
            let result = `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;
                attribute vec2 aTextureCoords;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;
                varying mediump float vLightIntensity;

                void main()
                {
                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);
                   gl_Position = uPMatrix * uVMatrix * pos;
                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;

                   vec3 lightDir = vec3(0.9, 0.7, 1.0);
                   vLightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);

                   vColor = vec4(aColor, 1.0);
`;
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        `vTextureCoords = aTextureCoords;
`;
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        `vec3 e = normalize(pos.xyz);
	                 vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);
	                 mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));
	                 vTextureCoords = r.xy / m + .5;
`;
                    break;
            }
            result += `}`;
            return result;
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            /** @type {?} */
            let result = `uniform sampler2D uTexture0;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;
                varying mediump float vLightIntensity;

                void main()
                {
            	    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));
`;
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        `gl_FragColor = vec4(clamp(texColor.xyz * (1.0 + .15 * vLightIntensity), 0.0, 1.0), texColor.a); 
            `;
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        `gl_FragColor = texColor.a;   
`;
                    break;
            }
            result += `}`;
            return result;
        }
    }
    modelstageweb.TexturedMeshShaderProgramWebGL = TexturedMeshShaderProgramWebGL;
    class ShadowTexturedMeshShaderProgramWebGL extends TexturedMeshShaderProgramWebGL {
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            return `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;
                attribute vec2 aTextureCoords;

                varying mediump float height;

                void main()
                {
                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);
                   height = (uMMatrix * vec4(aPosition, 1.0)).y;
                }`;
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return `uniform sampler2D uTexture0;
                varying mediump float height;


                void main()
                {
                    gl_FragColor = vec4(.2, .2, .2, clamp(1.0 - (height / 3.0), 0.0, 1.0)); 
                }`;
        }
    }
    modelstageweb.ShadowTexturedMeshShaderProgramWebGL = ShadowTexturedMeshShaderProgramWebGL;
    class MatCapShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 11;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                let textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                let textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    /** @type {?} */
                    let color = context.State.get('Color', psgeometry.Vec4.One);
                    /** @type {?} */
                    let uColorLoc = stage.gl.getUniformLocation(this.program, 'uColor');
                    stage.gl.uniform4fv(uColorLoc, color.elements());
                    // draw triangles
                    /** @type {?} */
                    let triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            /** @type {?} */
            let result = `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;
                attribute vec2 aTextureCoords;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;

                void main()
                {
                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);
                   gl_Position = uPMatrix * uVMatrix * pos;
                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;

                   vec3 e = normalize(pos.xyz);
	               vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);
	               mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));
	               vTextureCoords = r.xy / m + .5;
                }`;
            return result;
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            /** @type {?} */
            let result = `uniform sampler2D uTexture0;
                uniform mediump vec4 uColor;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;

                void main()
                {
            	    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));
                    //mediump vec3 green = vec3(0, 0.44, 0.09);
                    //mediump vec3 green = vec3(0.69, 0.34, 0.00);  //or
                    //mediump vec3 green = vec3(0.02, 0.31, 0.06);  // g
                    //mediump vec3 green = vec3(0.31, 0.02, 0.06);  // r
                    //mediump vec3 green = vec3(0.02, 0.17, 0.31);  // b
                    mediump float colorFac = (texColor.x - texColor.y) / 0.65;
                    mediump float whiteFac = (1.0 - colorFac) * 0.75;
                    mediump vec3 color = vec3(whiteFac, whiteFac, whiteFac) + colorFac * uColor.rgb;

                    gl_FragColor = vec4(color, texColor.a * uColor.a);   
            }`;
            return result;
        }
    }
    modelstageweb.MatCapShaderProgramWebGL = MatCapShaderProgramWebGL;
    class RenderStateStack {
        constructor() {
            this.modelTransform = [psgeometry.Matrix4.Identity];
            this.stack = [];
        }
        /**
         * Top of the state stack.
         * @return {?}
         */
        get Top() {
            return this.stack[this.stack.length - 1];
        }
        /**
         * Determines the current model transformation.
         * @return {?}
         */
        get CurrentModelTransform() {
            return this.modelTransform[this.modelTransform.length - 1];
        }
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        pushState(state) {
            state.Parent = this.stack.length == 0 ? null : this.Top;
            this.stack.push(state);
            if (state.contains('ModelTransform')) {
                /** @type {?} */
                let modelTransform = state.get('ModelTransform', psgeometry.Matrix4.Identity);
                this.modelTransform.push((/** @type {?} */ (this.CurrentModelTransform.multiply(modelTransform))));
            }
            else {
                this.modelTransform.push(this.CurrentModelTransform);
            }
        }
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        popState() {
            this.Top.Parent = null;
            this.stack.pop();
            this.modelTransform.pop();
        }
    }
    /**
     * A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
     *
     * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
     * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
     * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
     * also by previously traversed SceneItems in the scene hierarchy.
     */
    class RenderContextWebGL {
        constructor() {
            this.sceneCategory = '';
            this.stateStack = new RenderStateStack();
            this.modelTransform = null;
            this.nodeTransform = null;
            this.phase = '';
        }
        /**
         * @return {?}
         */
        get Phase() { return this.phase; }
        /**
         * @param {?} value
         * @return {?}
         */
        set Phase(value) { this.phase = value; }
        /**
         * Returns the current state that is composed of previously set state values.
         * @return {?}
         */
        get State() {
            return this.stateStack.Top;
        }
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        pushState(state) {
            this.stateStack.pushState(state);
        }
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        popState() {
            this.stateStack.popState();
        }
        /**
         * @return {?}
         */
        get ModelTransform() {
            return this.stateStack.CurrentModelTransform;
        }
        /**
         * The current scene's category.
         * @return {?}
         */
        get SceneCategory() {
            return this.sceneCategory;
        }
        /**
         * The current scene's category.
         * @param {?} value
         * @return {?}
         */
        set SceneCategory(value) {
            this.sceneCategory = value;
        }
        /**
         * The stage the SceneItems are being rendered to.
         * @return {?}
         */
        get Stage() {
            return this.stage;
        }
        /**
         * The stage the SceneItems are being rendered to.
         * @param {?} value
         * @return {?}
         */
        set Stage(value) {
            this.stage = value;
        }
        /**
         * @return {?}
         */
        get Camera() {
            return this.camera;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Camera(value) {
            this.camera = value;
        }
        /**
         * The current shader program.
         * @return {?}
         */
        get ShaderProgram() {
            return this.shaderProgram;
        }
        /**
         * The current shader program.
         * @param {?} value
         * @return {?}
         */
        set ShaderProgram(value) {
            this.shaderProgram = value;
        }
        /**
         * @return {?}
         */
        get NodeTransform() {
            return this.nodeTransform;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set NodeTransform(value) {
            this.nodeTransform = value;
        }
    }
    modelstageweb.RenderContextWebGL = RenderContextWebGL;
    class StageWebGL {
        /**
         * @param {?} canvasElementId
         */
        constructor(canvasElementId) {
            this.phaseSpecificShaderPrograms = {};
            this.shaderPrograms = {};
            this.tools = new ToolsWebGL(this);
            try {
                this.context = new RenderContextWebGL();
                this.context.Stage = this;
                this.assetStore = new AssetStoreWebGL();
                this.assetFactory = new AssetFactoryWebGL(this);
                this.canvas = (/** @type {?} */ (document.getElementById(canvasElementId)));
                if (this.canvas) {
                    this.gl = (/** @type {?} */ ((this.canvas.getContext('webgl') || (this.canvas.getContext('experimental-webgl')))));
                    /** @type {?} */
                    let ext = this.gl.getExtension('OES_element_index_uint');
                    window.addEventListener('resize', () => {
                        this.resize();
                    });
                }
                if (!this.gl) {
                    alert('Unable to initialize WebGL. Your browser may not support it.');
                }
            }
            catch (e) {
                alert('Unable to initialize WebGL. Your browser may not support it. Error: ' + e);
            }
        }
        /**
         * @return {?}
         */
        get Canvas() {
            return this.canvas;
        }
        /**
         * @return {?}
         */
        get Camera() {
            return this.camera;
        }
        /**
         * @return {?}
         */
        get Tools() {
            return this.tools;
        }
        /**
         * @return {?}
         */
        get AssetFactory() {
            return this.assetFactory;
        }
        /**
         * @return {?}
         */
        get AssetStore() {
            return this.assetStore;
        }
        /**
         * @return {?}
         */
        initialize() {
            this.shadowCamera = new ShadowCameraWebGL();
            this.shadowCamera.resize(this);
            this.camera = new CameraWebGL();
            this.camera.resize(this);
            this.resize();
        }
        /**
         * @param {?} box
         * @return {?}
         */
        updateShadowArea(box) {
            this.shadowCamera.updateShadowArea(box);
        }
        /**
         * @param {?} context
         * @return {?}
         */
        applyState(context) {
            /** @type {?} */
            let program = context.ShaderProgram.Program;
            /** @type {?} */
            let resultingModelTransformation = psgeometry.Matrix4.Identity;
            if (context.ModelTransform && context.NodeTransform) {
                resultingModelTransformation = (/** @type {?} */ (context.NodeTransform.multiply(context.ModelTransform)));
            }
            else if (context.ModelTransform) {
                resultingModelTransformation = context.ModelTransform;
            }
            else if (context.NodeTransform) {
                resultingModelTransformation = context.NodeTransform;
            }
            /** @type {?} */
            let mMatrixLoc = this.gl.getUniformLocation(program, 'uMMatrix');
            this.gl.uniformMatrix4fv(mMatrixLoc, false, resultingModelTransformation.transpose().elements);
            /** @type {?} */
            let vMatrixLoc = this.gl.getUniformLocation(program, 'uVMatrix');
            this.gl.uniformMatrix4fv(vMatrixLoc, false, context.Camera.ViewMatrix.transpose().elements);
            /** @type {?} */
            let pMatrixLoc = this.gl.getUniformLocation(program, 'uPMatrix');
            this.gl.uniformMatrix4fv(pMatrixLoc, false, context.Camera.ProjectionMatrix.transpose().elements);
        }
        /**
         * @param {?} scene
         * @return {?}
         */
        render(scene) {
            if (scene.isDirty() || this.camera.isDirty() || this.shadowCamera.isDirty()) {
                this.context.Phase = 'Shadow';
                this.context.Camera = this.shadowCamera;
                this.shadowCamera.beginRender(this);
                scene.render(this.context);
                this.shadowCamera.endRender(this);
                this.context.Phase = '';
                this.context.Camera = this.camera;
                this.camera.beginRender(this);
                scene.render(this.context);
                this.camera.endRender(this);
            }
        }
        /**
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        registerShaderProgram(shaderProgramKey, shaderProgram) {
            this.shaderPrograms[shaderProgramKey] = shaderProgram;
        }
        /**
         * @param {?} phaseKey
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        registerPhaseSpecificShaderProgram(phaseKey, shaderProgramKey, shaderProgram) {
            /** @type {?} */
            let phase = this.phaseSpecificShaderPrograms[phaseKey];
            if (!phase) {
                phase = {};
                this.phaseSpecificShaderPrograms[phaseKey] = phase;
            }
            phase[shaderProgramKey] = shaderProgram;
        }
        /**
         * @param {?} context
         * @param {?} shaderProgramKey
         * @return {?}
         */
        getShaderProgram(context, shaderProgramKey) {
            /** @type {?} */
            let result;
            if (context.phase) {
                /** @type {?} */
                let phase = this.phaseSpecificShaderPrograms[context.phase];
                if (phase) {
                    result = phase[shaderProgramKey];
                }
            }
            return result || this.shaderPrograms[shaderProgramKey];
        }
        /**
         * @private
         * @return {?}
         */
        resize() {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
            this.camera.resize(this);
        }
    }
    modelstageweb.StageWebGL = StageWebGL;
    let ConnectionState;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["Ready"] = 0] = "Ready";
        ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
        ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
        ConnectionState[ConnectionState["Error"] = 3] = "Error";
    })(ConnectionState = modelstageweb.ConnectionState || (modelstageweb.ConnectionState = {}));
    /**
     * @abstract
     */
    class ServerConnection {
        constructor() {
            this.state = ConnectionState.Ready;
        }
        /**
         * @return {?}
         */
        get IsConnected() {
            return this.state == ConnectionState.Connected;
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        onMessage(callback) {
            this.handleMessage = callback;
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        onConnected(callback) {
            this.handleConnected = callback;
        }
    }
    modelstageweb.ServerConnection = ServerConnection;
    class SignalRServerConnection extends ServerConnection {
        constructor() {
            super();
            this.connection = new HubConnectionBuilder()
                .withUrl('/api/state')
                .configureLogging(LogLevel.Trace)
                //.withHubProtocol(<any>(new MessagePackHubProtocol()))
                .build();
            this.connection.on('msg', (data) => {
                if (this.handleMessage) {
                    /** @type {?} */
                    let msg = new MessageEvent('binary', { data: data });
                    this.handleMessage(msg);
                }
            });
        }
        /**
         * @return {?}
         */
        connect() {
            this.state = ConnectionState.Connecting;
            this.connection.start()
                .then(() => {
                if (this.handleConnected) {
                    this.state = ConnectionState.Connected;
                    this.handleConnected(new Event('connected'));
                }
            })
                .catch((e) => {
                this.state = ConnectionState.Error;
            });
        }
        /**
         * @return {?}
         */
        disconnect() {
            this.connection.stop()
                .then(() => {
                this.state = ConnectionState.Ready;
            })
                .catch(() => {
                this.state = ConnectionState.Error;
            });
        }
        /**
         * @param {?} data
         * @return {?}
         */
        send(data) {
            this.connection.invoke('Msg', data);
        }
    }
    modelstageweb.SignalRServerConnection = SignalRServerConnection;
    class WebSocketServerConnection extends ServerConnection {
        /**
         * @param {?=} url
         * @return {?}
         */
        connect(url) {
            if (this.state == ConnectionState.Ready || this.state == ConnectionState.Error) {
                /** @type {?} */
                let uri = url ? url : 'ws://' + window.location.host + '/api/scene';
                this.state = ConnectionState.Connecting;
                this.websocket = new WebSocket(uri);
                this.websocket.binaryType = 'arraybuffer';
                this.websocket.onopen = (event) => {
                    this.state = ConnectionState.Connected;
                    console.log('websocket connected.');
                    if (this.handleConnected) {
                        this.handleConnected(event);
                    }
                };
                this.websocket.onclose = (event) => {
                    console.log('websocket closed.');
                    this.state = ConnectionState.Ready;
                };
                this.websocket.onerror = (event) => {
                    this.state = ConnectionState.Error;
                    console.log('websocket error.');
                };
                this.websocket.onmessage = (event) => {
                    if (this.handleMessage) {
                        this.handleMessage(event);
                    }
                };
            }
        }
        /**
         * @return {?}
         */
        disconnect() {
            this.websocket.close();
        }
        /**
         * @param {?} data
         * @return {?}
         */
        send(data) {
            this.websocket.send(data);
        }
    }
    modelstageweb.WebSocketServerConnection = WebSocketServerConnection;
    class Tool {
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        enter(interfaceController) {
            this.interfaceController = interfaceController;
        }
        /**
         * @return {?}
         */
        leave() { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleKeyUp(e) { return false; }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseDown(e) { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) { }
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        handleDrag(e, startX, startY, dX, dY) { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseWheel(e) { }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleClick(e, x, y) { }
    }
    modelstageweb.Tool = Tool;
    class InterfaceController {
        constructor() {
            this.tools = [];
            this.leftButton = 0;
            this.leftButtonDown = false;
            this.startX = NaN;
            this.startY = NaN;
            this.lastX = NaN;
            this.lastY = NaN;
            this.onMove = null;
            this.onDrag = null;
            this.onMouseWheel = null;
        }
        /**
         * @private
         * @return {?}
         */
        hasTool() {
            return this.tools.length > 0;
        }
        /**
         * @return {?}
         */
        get CurrentTool() {
            return this.hasTool() ? this.tools[this.tools.length - 1] : null;
        }
        /**
         * @param {?} target
         * @return {?}
         */
        bindEvents(target) {
            this.target = target;
            $(target).on('mousewheel', (e) => {
                this.mouseWheel(e);
            });
            $(target).on('mousedown touchstart', (e) => {
                this.mouseDown(e);
                e.preventDefault();
            });
            if (!((/** @type {?} */ (target))).setCapture) {
                $(document).on('mousemove touchmove', (e) => {
                    this.mouseMove(e);
                });
            }
            else {
                $(target).on('mousemove touchmove', (e) => {
                    this.mouseMove(e);
                });
            }
            $(document).on('mouseup touchend touchcancel', (e) => {
                this.mouseUp(e);
                e.preventDefault();
            });
            $(target).on('losecapture', (e) => {
                this.mouseUp(e);
                e.preventDefault();
            });
            $(document).on('keyup', (e) => {
                if (this.keyUp(e)) {
                    e.preventDefault();
                }
            });
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        updateLastPosition(e) {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        }
        /**
         * @param {?} tool
         * @return {?}
         */
        pushTool(tool) {
            if (this.CurrentTool) {
                this.CurrentTool.leave();
            }
            this.tools.push(tool);
            tool.enter(this);
        }
        /**
         * @return {?}
         */
        popTool() {
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].leave();
                this.tools.pop();
            }
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].enter(this);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        keyUp(e) {
            if (this.hasTool()) {
                return this.CurrentTool.handleKeyUp(e);
            }
            else {
                return false;
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseDown(e) {
            if (e.button == this.leftButton) {
                this.leftButtonDown = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.updateLastPosition(e);
                if (e.target.setCapture)
                    e.target.setCapture();
            }
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseDown(e);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseMove(e) {
            if (this.hasTool() && !e.ctrlKey) {
                if (this.leftButtonDown) {
                    this.CurrentTool.handleDrag(e, this.startX, this.startY, e.clientX - this.lastX, e.clientY - this.lastY);
                }
                this.CurrentTool.handleMouseMove(e, e.clientX, e.clientY);
            }
            else {
                if (this.leftButtonDown) {
                    this.drag(e, e.clientX - this.lastX, e.clientY - this.lastY);
                }
                else {
                    this.onMove(e, e.clientX, e.clientY);
                }
            }
            if (this.leftButtonDown) {
                this.updateLastPosition(e);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseUp(e) {
            /** @type {?} */
            let updatePosition = false;
            if (e.button == this.leftButton) {
                this.leftButtonDown = false;
                updatePosition = true;
                if (e.target.releaseCapture)
                    e.target.releaseCapture();
            }
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseUp(e);
            }
            else {
                if (updatePosition) {
                    this.updateLastPosition(e);
                }
            }
        }
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        drag(e, dX, dY) {
            if (this.onDrag) {
                this.onDrag(e, dX, dY);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseWheel(e) {
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseWheel(e);
            }
            else {
                if (this.onMouseWheel) {
                    this.onMouseWheel(e);
                }
                e.preventDefault();
            }
        }
    }
    modelstageweb.InterfaceController = InterfaceController;
    class CameraController {
        /**
         * @param {?} stage
         * @param {?} camera
         * @param {?} interfaceController
         * @param {?} connection
         */
        constructor(stage, camera, interfaceController, connection) {
            this.radius = 20.0;
            this.yaw = 0.0;
            this.pitch = 0.0;
            this.dragDivisor = 100.0;
            this.rotateDivisor = 200.0;
            this.stage = stage;
            this.camera = camera;
            this.connection = connection;
            interfaceController.bindEvents($(stage.Canvas));
            interfaceController.onDrag = (e, dX, dY) => {
                this.drag(e, dX, dY);
            };
            interfaceController.onMouseWheel = (e) => {
                this.mouseWheel(e);
            };
            interfaceController.onMove = (e, x, y) => {
                this.move(e, x, y);
            };
            this.center = new psgeometry.Vec3(0.0, 0.0, 0.0);
            this.updateCamera();
        }
        /**
         * @return {?}
         */
        get Yaw() {
            return this.yaw;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Yaw(value) {
            this.yaw = value;
            this.updateCamera();
        }
        /**
         * @param {?} radius
         * @param {?} pitch
         * @param {?} yaw
         * @return {?}
         */
        construct(radius, pitch, yaw) {
            this.radius = radius;
            this.pitch = pitch;
            this.yaw = yaw;
            this.updateCamera();
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseWheel(e) {
            if (e.shiftKey) {
                /** @type {?} */
                let d = this.getViewDir().multiply(((/** @type {?} */ (e))).deltaY || ((/** @type {?} */ (e))).deltaX);
                this.center = this.center.sub(d);
            }
            else {
                this.radius += ((/** @type {?} */ (e))).deltaY * Math.log(this.radius + 1) / 2;
                this.radius = Math.max(0.01, this.radius);
            }
            this.updateCamera();
        }
        /**
         * @private
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        move(e, x, y) {
        }
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        drag(e, dX, dY) {
            if (e.shiftKey) {
                /** @type {?} */
                let x = this.getViewPlaneX();
                /** @type {?} */
                let y = this.getViewPlaneY();
                this.center = this.center
                    .add(x.multiply(dX / this.dragDivisor))
                    .add(y.multiply(dY / this.dragDivisor));
            }
            else {
                this.yaw -= dX / this.rotateDivisor;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch - dY / this.rotateDivisor));
            }
            this.updateCamera();
        }
        /**
         * @private
         * @return {?}
         */
        getViewPlaneX() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(-1.0, 0.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        getViewPlaneY() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(0.0, 1.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        getViewDir() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(0.0, 0.0, -1.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        getCameraPos() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(0.0, 0.0, this.radius);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        updateCamera() {
            this.camera.update(this.getCameraPos(), this.center, new psgeometry.Vec3(0.0, 1.0, 0.0));
        }
    }
    modelstageweb.CameraController = CameraController;
    class CommonMessageTypes {
    }
    CommonMessageTypes.AppStateDelta = 0x0100;
    CommonMessageTypes.ServerHandshake = 0x0101;
    CommonMessageTypes.ClientHandshake = 0x0102;
    CommonMessageTypes.ClientConfirmation = 0x0103;
    CommonMessageTypes.AppStateInitialization = 0x104;
    CommonMessageTypes.AnchorRequest = 0x01fe;
    CommonMessageTypes.SharedAnchor = 0x01ff;
    modelstageweb.CommonMessageTypes = CommonMessageTypes;
    class NetworkChannelMessage {
        constructor() {
            this.messageType = CommonMessageTypes.AppStateDelta;
        }
        /**
         * @return {?}
         */
        get Content() {
            return this.content;
        }
        /**
         * @return {?}
         */
        get MessageType() {
            return this.messageType;
        }
        /**
         * @param {?} buffer
         * @return {?}
         */
        static FromBuffer(buffer) {
            /** @type {?} */
            let result = new NetworkChannelMessage();
            result.content = buffer;
            return result;
        }
        /**
         * @return {?}
         */
        get HasPayload() {
            return this.content.byteLength > NetworkChannelMessage.HeaderSize;
        }
        /**
         * @return {?}
         */
        get PayloadSize() {
            return this.content.byteLength - NetworkChannelMessage.HeaderSize;
        }
    }
    NetworkChannelMessage.HeaderSize = 8;
    modelstageweb.NetworkChannelMessage = NetworkChannelMessage;
})(modelstageweb || (modelstageweb = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var modelstageappstate;
(function (modelstageappstate) {
    /**
     * The base class for local app state storage.
     *
     * App state data is organized in clusters. Each cluster has a distinct data layout comparable to a struct data type.
     * A cluster can store and manage multiple values (AppStateEntry). Depending on the nature of the data, it can be global
     * (shared among all peers) or local (each peer has its own copy of the cluster and is aware of the remote peer's instances).
     * Besides that, global as well as local clusters can be single-instance or multi-instance. Global, single-instance data exists
     * only once. Global, multi-instance data is shared among all peers, but can consist of multiple instances of the same
     * "record". Each instance has a peer ID and an instance ID both ID fields together build a "globally" unique ID. For
     * local, single-instance clusters, each peer may or may not have a single instance of the cluster, for local, multi-instance
     * clusters, each peer may have zero or more instances of the cluster, again identified by a combination of a peer ID and an
     * instance ID.
     */
    class AppStateBase {
        constructor() {
            this.clusterManagers = {};
        }
        /**
         * @return {?}
         */
        get LocalPeerID() {
            return this.localPeerID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set LocalPeerID(value) {
            this.localPeerID = value;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        getClusterManager(key) {
            return this.clusterManagers[key];
        }
        /**
         * Adds a certain cluster type (global/local, single/multi) to the app state.
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        addCluster(key, cluster) {
            this.clusterManagers[key] = cluster;
        }
        /**
         * Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
         * during the transactional phase of the app state.
         * @return {?}
         */
        beginTransaction() {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].beginTransaction();
            }
        }
        /**
         * Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        endTransaction() {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].endTransaction();
            }
        }
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
         * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
         * @param {?} scene
         * @return {?}
         */
        applyChanges(scene) {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].applyChanges(scene);
            }
        }
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @return {?}
         */
        serializeTransaction(deltaWriter) {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].serializeTransaction(deltaWriter, clusterManagerKey, this);
            }
        }
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, scene) {
            /** @type {?} */
            let success = true;
            while (!deltaReader.isAtEnd() && success) {
                /** @type {?} */
                let clusterID = deltaReader.readClusterID();
                if (clusterID) {
                    /** @type {?} */
                    let clusterManager = this.clusterManagers[clusterID];
                    if (clusterManager) {
                        success = clusterManager.deserializeTransaction(deltaReader, this, scene);
                    }
                    else {
                        success = false;
                    }
                }
                else {
                    success = false;
                }
            }
            return success;
        }
    }
    modelstageappstate.AppStateBase = AppStateBase;
    class AppState extends AppStateBase {
        /**
         * @return {?}
         */
        static GetInstance() {
            if (!AppState.Instance) {
                AppState.Instance = new AppState();
            }
            return AppState.Instance;
        }
    }
    AppState.Instance = null;
    modelstageappstate.AppState = AppState;
    class BinaryWriter {
        constructor() {
            this.buf = [];
        }
        /**
         * @return {?}
         */
        flush() {
            /** @type {?} */
            let result = new Uint8Array(this.buf.length);
            result.set(this.buf);
            return result;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeByte(val) {
            this.buf.push(val);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeInt16(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeUInt16(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeInt32(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeInt64(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff, (val >> 32) & 0xff, (val >> 40) & 0xff, (val >> 48) & 0xff, (val >> 56) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeTimestamp(val) {
            this.writeInt64(val);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeFloat32(val) {
            /** @type {?} */
            let buf = new ArrayBuffer(4);
            /** @type {?} */
            let view = new DataView(buf);
            view.setFloat32(0, val, true);
            /** @type {?} */
            let byteBuf = new Int8Array(buf);
            this.buf.push.apply(byteBuf);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeString(val) {
            this.writeInt32(val.length);
            this.writeCharArray(val, val.length);
        }
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        writeCharArray(val, arrayLength) {
            for (let idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) : 0x00);
            }
        }
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        writeWideCharArray(val, arrayLength) {
            for (let idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) & 0xff : 0x00, idx < val.length ? (val.charCodeAt(idx) >> 8) & 0xff : 0x00);
            }
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeVec3(val) {
            /** @type {?} */
            let buf = new ArrayBuffer(12);
            /** @type {?} */
            let view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            /** @type {?} */
            let byteBuf = new Uint8Array(buf);
            this.buf.push.apply(byteBuf);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeVec4(val) {
            /** @type {?} */
            let buf = new ArrayBuffer(16);
            /** @type {?} */
            let view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            view.setFloat32(12, val.w, true);
            /** @type {?} */
            let byteBuf = new Uint8Array(buf);
            this.buf.push(byteBuf[0], byteBuf[1], byteBuf[2], byteBuf[3], byteBuf[4], byteBuf[5], byteBuf[6], byteBuf[7], byteBuf[8], byteBuf[9], byteBuf[10], byteBuf[11], byteBuf[12], byteBuf[13], byteBuf[14], byteBuf[15]);
        }
    }
    modelstageappstate.BinaryWriter = BinaryWriter;
    class BinaryReader {
        /**
         * @param {?} buf
         */
        constructor(buf) {
            this.currentPos = 8;
            this.error = false;
            this.buf = buf;
        }
        /**
         * @return {?}
         */
        get Error() {
            return this.error;
        }
        /**
         * @return {?}
         */
        get AtEnd() {
            return this.currentPos >= this.buf.byteLength;
        }
        /**
         * @param {?} count
         * @return {?}
         */
        assureRemainingBytes(count) {
            return this.currentPos + count <= this.buf.byteLength;
        }
        /**
         * @return {?}
         */
        readByte() {
            if (this.assureRemainingBytes(1)) {
                return this.buf[this.currentPos++];
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readUInt16() {
            if (this.assureRemainingBytes(2)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256;
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readUInt64() {
            if (this.assureRemainingBytes(8)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256 +
                    this.buf[this.currentPos++] * 65536 +
                    this.buf[this.currentPos++] * 16777216 +
                    this.buf[this.currentPos++] * 4294967296 +
                    this.buf[this.currentPos++] * 1099511627776 +
                    this.buf[this.currentPos++] * 281474976710656 +
                    this.buf[this.currentPos++] * 72057594037927936;
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readUInt32() {
            if (this.assureRemainingBytes(4)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256 +
                    this.buf[this.currentPos++] * 65536 +
                    this.buf[this.currentPos++] * 16777216;
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readString() {
            /** @type {?} */
            let result = null;
            /** @type {?} */
            let length = this.readUInt32();
            if (!this.error) {
                if (this.assureRemainingBytes(length)) {
                    result = this.readCharArray(length);
                }
                else {
                    this.error = true;
                }
            }
            return result;
        }
        /**
         * @return {?}
         */
        readTimestamp() {
            return this.readUInt64();
        }
        /**
         * @param {?} arrayLength
         * @return {?}
         */
        readCharArray(arrayLength) {
            /** @type {?} */
            let result = [];
            /** @type {?} */
            let idx = 0;
            while (idx < arrayLength && this.buf[this.currentPos + idx] != 0x00 && !this.error) {
                if (this.currentPos < this.buf.byteLength) {
                    result.push(this.buf[this.currentPos + idx++]);
                }
                else {
                    this.error = true;
                }
            }
            this.currentPos += arrayLength;
            return String.fromCharCode.apply(null, result);
        }
        /**
         * @return {?}
         */
        readFloat32() {
            /** @type {?} */
            let result = NaN;
            if (this.assureRemainingBytes(4)) {
                /** @type {?} */
                let buf = new ArrayBuffer(4);
                /** @type {?} */
                let view = new DataView(buf);
                view.setUint8(0, this.buf[this.currentPos++]);
                view.setUint8(1, this.buf[this.currentPos++]);
                view.setUint8(2, this.buf[this.currentPos++]);
                view.setUint8(3, this.buf[this.currentPos++]);
                result = view.getFloat32(0, true);
            }
            else {
                this.error = true;
            }
            return result;
        }
        /**
         * @return {?}
         */
        readVec3() {
            /** @type {?} */
            let result = null;
            if (this.assureRemainingBytes(12)) {
                /** @type {?} */
                let buf = new ArrayBuffer(12);
                /** @type {?} */
                let view = new DataView(buf);
                for (let i = 0; i < 12; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec3(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true));
            }
            else {
                this.error = true;
            }
            return result;
        }
        /**
         * @return {?}
         */
        readVec4() {
            /** @type {?} */
            let result = null;
            if (this.assureRemainingBytes(16)) {
                /** @type {?} */
                let buf = new ArrayBuffer(16);
                /** @type {?} */
                let view = new DataView(buf);
                for (let i = 0; i < 16; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec4(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true), view.getFloat32(12, true));
            }
            else {
                this.error = true;
            }
            return result;
        }
    }
    modelstageappstate.BinaryReader = BinaryReader;
    class AppStateDeltaReader {
        /**
         * @param {?} reader
         */
        constructor(reader) {
            this.isInitializing = false;
            this.reader = reader;
        }
        /**
         * @return {?}
         */
        get Reader() {
            return this.reader;
        }
        /**
         * Indicates if there is data left to process.
         * @return {?}
         */
        isAtEnd() { return this.reader.AtEnd; }
        /**
         * Reads the cluster ID from the data.
         * @return {?}
         */
        readClusterID() {
            return this.reader.readString();
        }
        /**
         * Indicates if the message is an initialization message rather than a "normal" delta package.
         * This can be evaluated by the cluster to handle initialization different from updating.
         * @return {?}
         */
        get IsInitializing() {
            return this.isInitializing;
        }
    }
    modelstageappstate.AppStateDeltaReader = AppStateDeltaReader;
    class AppStateDeltaWriter {
        /**
         * @param {?} writer
         */
        constructor(writer) {
            this.writer = writer;
        }
        /**
         * @return {?}
         */
        get Writer() {
            return this.writer;
        }
    }
    modelstageappstate.AppStateDeltaWriter = AppStateDeltaWriter;
    /**
     * @abstract
     */
    class AppStateEntry {
        constructor() {
            this.transactional = false;
        }
        /**
         * @return {?}
         */
        get AppState() {
            return this.appState;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set AppState(val) {
            this.appState = val;
        }
        /**
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        register(key, cluster) {
            this.key = key;
            this.cluster = cluster;
        }
        /**
         * @return {?}
         */
        reconcile() {
        }
        /**
         * @return {?}
         */
        setDirty() {
            this.cluster.setDirty();
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            //assert(!m_isTransactional);
            this.transactional = true;
        }
        /**
         * @return {?}
         */
        endTransaction() {
            //assert(m_isTransactional);
            this.transactional = false;
        }
        /**
         * @return {?}
         */
        isTransactional() {
            return this.transactional;
        }
        /**
         * @return {?}
         */
        isLocked() {
            return this.cluster.IsLocked;
        }
    }
    modelstageappstate.AppStateEntry = AppStateEntry;
    /**
     * @abstract
     */
    class CommonAppStateEntry extends AppStateEntry {
        constructor() {
            super(...arguments);
            this.changedAt = 0;
        }
        /**
         * @return {?}
         */
        beginChanging() {
            this.changedAt = Date.now();
            this.setDirty();
        }
    }
    modelstageappstate.CommonAppStateEntry = CommonAppStateEntry;
    class AppStateStringValue extends CommonAppStateEntry {
        constructor() {
            super(...arguments);
            this.dirty = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set(value) {
            if (value != this.value) {
                this.changing();
                this.value = value;
            }
        }
        /**
         * @return {?}
         */
        get() {
            return this.value;
        }
        /**
         * @return {?}
         */
        getPreviousValue() {
            return this.previousValue;
        }
        /**
         * @return {?}
         */
        changing() {
            //assert(IsTransactional());
            if (!this.dirty && !this.isLocked()) {
                this.beginChanging();
                this.previousValue = this.value;
                this.dirty = true;
            }
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.dirty;
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            super.beginTransaction();
            this.dirty = false;
        }
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        deserializeDelta(reader, key) {
            /** @type {?} */
            let result = false;
            // key was read by cluster
            /** @type {?} */
            let changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                let prevValue = reader.Reader.readString();
                if (prevValue != null) {
                    this.value = reader.Reader.readString();
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        }
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        serializeDelta(writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeString(this.previousValue);
            writer.Writer.writeString(this.value);
        }
    }
    modelstageappstate.AppStateStringValue = AppStateStringValue;
    /**
     * @abstract
     * @template T
     */
    class AppStateValue extends CommonAppStateEntry {
        constructor() {
            super(...arguments);
            this.dirty = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set(value) {
            this.value = value;
        }
        /**
         * @return {?}
         */
        get() {
            return this.value;
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.dirty;
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            super.beginTransaction();
            this.dirty = false;
        }
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        deserializeDelta(reader, key) {
            /** @type {?} */
            let result = false;
            // key was read by cluster
            /** @type {?} */
            let changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                let prevValue = this.readValue(reader);
                if (prevValue != null) {
                    this.value = this.readValue(reader);
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        }
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        serializeDelta(writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            this.writeValue(writer, this.previousValue);
            this.writeValue(writer, this.value);
        }
    }
    modelstageappstate.AppStateValue = AppStateValue;
    class AppStateBoolValue extends AppStateValue {
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        readValue(reader) {
            /** @type {?} */
            let result = false;
            if (reader.Reader.assureRemainingBytes(1)) {
                result = reader.Reader.readByte() != 0;
            }
            return result;
        }
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(writer, value) {
            writer.Writer.writeByte(value ? 0xff : 0);
        }
    }
    modelstageappstate.AppStateBoolValue = AppStateBoolValue;
    class AppStateVector4Value extends AppStateValue {
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        readValue(reader) {
            /** @type {?} */
            let result = null;
            // sizeof(float) * (x,y,z,w)
            if (reader.Reader.assureRemainingBytes(4 * 4)) {
                result = new psgeometry.Vec4();
                result.x = reader.Reader.readFloat32();
                result.y = reader.Reader.readFloat32();
                result.z = reader.Reader.readFloat32();
                result.w = reader.Reader.readFloat32();
            }
            return result;
        }
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(writer, value) {
            writer.Writer.writeFloat32(value.x);
            writer.Writer.writeFloat32(value.y);
            writer.Writer.writeFloat32(value.z);
            writer.Writer.writeFloat32(value.w);
        }
    }
    modelstageappstate.AppStateVector4Value = AppStateVector4Value;
    class AppStateFloatValue extends AppStateValue {
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        readValue(reader) {
            /** @type {?} */
            let result = NaN;
            if (reader.Reader.assureRemainingBytes(4)) {
                result = reader.Reader.readFloat32();
            }
            return result;
        }
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(writer, value) {
            writer.Writer.writeFloat32(value);
        }
    }
    modelstageappstate.AppStateFloatValue = AppStateFloatValue;
    class AppStateOperation {
        /**
         * @param {?} changedAt
         * @param {?=} isLocal
         */
        constructor(changedAt, isLocal = true) {
            this.changedAt = changedAt;
            this.isLocal = isLocal;
        }
        /**
         * @return {?}
         */
        get ChangedAt() {
            return this.changedAt;
        }
        /**
         * @return {?}
         */
        get IsLocal() {
            return this.isLocal;
        }
    }
    modelstageappstate.AppStateOperation = AppStateOperation;
    /**
     * @template T
     */
    class AppStateValueOperation extends AppStateOperation {
        /**
         * @param {?} changedAt
         * @param {?=} newValue
         * @param {?=} previousValue
         * @param {?=} isLocal
         */
        constructor(changedAt, newValue = null, previousValue = null, isLocal = true) {
            super(changedAt, isLocal);
            this.isNewValueDefined = false;
            this.isPreviousValueDefined = false;
            if (newValue != null) {
                this.isNewValueDefined = true;
                this.newValue = newValue;
            }
            if (previousValue) {
                this.isPreviousValueDefined = true;
                this.previousValue = previousValue;
            }
        }
        /**
         * @return {?}
         */
        get IsNewValueDefined() {
            return this.isNewValueDefined;
        }
        /**
         * @return {?}
         */
        get IsPreviousValueDefined() {
            return this.isPreviousValueDefined;
        }
        /**
         * @return {?}
         */
        get NewValue() {
            return this.newValue;
        }
        /**
         * @return {?}
         */
        get PreviousValue() {
            return this.previousValue;
        }
    }
    modelstageappstate.AppStateValueOperation = AppStateValueOperation;
    let OperationType;
    (function (OperationType) {
        OperationType[OperationType["Clear"] = 0] = "Clear";
        OperationType[OperationType["Append"] = 1] = "Append";
        OperationType[OperationType["Insert"] = 2] = "Insert";
        OperationType[OperationType["Remove"] = 3] = "Remove";
        OperationType[OperationType["Replace"] = 4] = "Replace";
    })(OperationType = modelstageappstate.OperationType || (modelstageappstate.OperationType = {}));
    let StorageFlags;
    (function (StorageFlags) {
        StorageFlags[StorageFlags["HasPreviousValue"] = 128] = "HasPreviousValue";
        StorageFlags[StorageFlags["HasNewValue"] = 64] = "HasNewValue";
        StorageFlags[StorageFlags["HasChangedDate"] = 32] = "HasChangedDate";
        StorageFlags[StorageFlags["ItemIndex16Bit"] = 16] = "ItemIndex16Bit";
        StorageFlags[StorageFlags["None"] = 0] = "None";
        StorageFlags[StorageFlags["Mask"] = 240] = "Mask";
    })(StorageFlags || (StorageFlags = {}));
    /**
     * @template T
     */
    class AppStateCollectionOperation extends AppStateValueOperation {
        /**
         * @param {?} changedAt
         * @param {?} operation
         * @param {?=} itemIndex
         * @param {?=} newValue
         * @param {?=} previousValue
         * @param {?=} isLocal
         */
        constructor(changedAt, operation, itemIndex = 0, newValue = null, previousValue = null, isLocal = true) {
            super(changedAt, newValue, previousValue, isLocal);
            this.operation = operation;
            this.itemIndex = itemIndex;
            this.reconciledItemIndex = itemIndex;
        }
        /**
         * @return {?}
         */
        get Operation() {
            return this.operation;
        }
        /**
         * @return {?}
         */
        get ItemIndex() {
            return this.itemIndex;
        }
        /**
         * @return {?}
         */
        get ReconciledItemIndex() {
            return this.reconciledItemIndex;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set ReconciledItemIndex(value) {
            this.reconciledItemIndex = value;
        }
    }
    modelstageappstate.AppStateCollectionOperation = AppStateCollectionOperation;
    /**
     * @template T
     */
    class AppStateCollection extends CommonAppStateEntry {
        /**
         * @param {?} appStateCollectionOperationType
         * @param {?=} serializeOperationChangedAt
         * @param {?=} serializePreviousValues
         */
        constructor(appStateCollectionOperationType, serializeOperationChangedAt = true, serializePreviousValues = true) {
            super();
            this.appStateCollectionOperationType = appStateCollectionOperationType;
            this.container = [];
            this.operations = [];
            this.serializeOperationChangedAt = serializeOperationChangedAt;
            this.serializePreviousValues = serializePreviousValues;
        }
        /**
         * @return {?}
         */
        get Operations() {
            return this.operations;
        }
        /**
         * @protected
         * @param {?} op
         * @return {?}
         */
        addOperation(op) {
            if (this.isTransactional()) {
                if (this.operations.length == 0) {
                    this.beginChanging();
                }
                this.operations.push(op);
            }
            else {
                console.error('AppState not transactional while adding operation to AppStateCollection');
            }
        }
        /**
         * @return {?}
         */
        clear() {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Clear));
            }
            this.container.length = 0;
        }
        /**
         * @param {?} item
         * @return {?}
         */
        append(item) {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Append, this.container.length, item));
            }
            this.container.push(item);
        }
        /**
         * @param {?} item
         * @param {?} beforeIndex
         * @return {?}
         */
        insert(item, beforeIndex) {
            if (beforeIndex <= this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Insert, beforeIndex, item));
                }
                this.container.splice(beforeIndex, 0, item);
            }
            else {
                console.error('Index out of range while inserting into AppStateCollection');
            }
        }
        /**
         * @param {?} index
         * @return {?}
         */
        remove(index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Remove, index, null, this.container[index]));
                }
                this.container.splice(index, 1);
            }
            else {
                console.error('Index out of range while removing from AppStateCollection');
            }
        }
        /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        replace(item, index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Replace, index, item, this.container[index]));
                }
                this.container[index] = item;
            }
            else {
                console.error('Index out of range while replacing item in AppStateCollection');
            }
        }
        /**
         * @param {?} index
         * @return {?}
         */
        GetItemAt(index) {
            return this.container[index];
        }
        /**
         * @return {?}
         */
        get Count() {
            return this.container.length;
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.operations.length > 0;
        }
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        deserializeDelta(reader, key) {
            // key was read by cluster
            /** @type {?} */
            let changedAt = reader.Reader.readTimestamp();
            /** @type {?} */
            let operationCount = reader.Reader.readUInt32();
            /** @type {?} */
            let success = !reader.Reader.Error;
            if (success) {
                if (operationCount > 0) {
                    this.setDirty();
                }
                for (let i = 0; i < operationCount; ++i) {
                    /** @type {?} */
                    let flags = reader.Reader.readByte();
                    if (!reader.Reader.Error) {
                        /** @type {?} */
                        let storageFlags = flags & StorageFlags.Mask;
                        /** @type {?} */
                        let opType = flags & ~StorageFlags.Mask;
                        /** @type {?} */
                        let opChangedAt = changedAt;
                        /** @type {?} */
                        let itemIndex = 0;
                        /** @type {?} */
                        let newValue;
                        /** @type {?} */
                        let prevValue;
                        if (storageFlags & StorageFlags.HasChangedDate) {
                            opChangedAt = reader.Reader.readTimestamp();
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.ItemIndex16Bit) {
                            itemIndex = reader.Reader.readUInt16();
                            success = success && !reader.Reader.Error;
                        }
                        else {
                            itemIndex = reader.Reader.readUInt32();
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.HasNewValue) {
                            newValue = (/** @type {?} */ (this.cluster.readValue(key, reader)));
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.HasPreviousValue) {
                            prevValue = (/** @type {?} */ (this.cluster.readValue(key, reader)));
                            success = success && !reader.Reader.Error;
                        }
                        this.operations.push(new this.appStateCollectionOperationType(opChangedAt, opType, itemIndex, newValue, prevValue, false /* IsLocal */));
                    }
                    else {
                        success = false;
                    }
                }
            }
            return success;
        }
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        serializeDelta(writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeInt32(this.operations.length);
            this.operations.forEach((op) => {
                /** @type {?} */
                let storageFlags = (op.ItemIndex < 0x10000 ? StorageFlags.ItemIndex16Bit : StorageFlags.None) |
                    (op.IsNewValueDefined ? StorageFlags.HasNewValue : StorageFlags.None) |
                    (op.IsPreviousValueDefined && this.serializePreviousValues ? StorageFlags.HasPreviousValue : StorageFlags.None) |
                    (this.serializeOperationChangedAt ? StorageFlags.HasChangedDate : StorageFlags.None);
                writer.Writer.writeByte(op.Operation | storageFlags);
                if (storageFlags & StorageFlags.HasChangedDate) {
                    writer.Writer.writeTimestamp(op.ChangedAt);
                }
                if (storageFlags & StorageFlags.ItemIndex16Bit) {
                    writer.Writer.writeUInt16(op.ItemIndex);
                }
                else {
                    writer.Writer.writeInt32(op.ItemIndex);
                }
                if (storageFlags & StorageFlags.HasNewValue) {
                    this.cluster.writeValue(key, writer, op.NewValue);
                }
                if (storageFlags & StorageFlags.HasPreviousValue) {
                    this.cluster.writeValue(key, writer, op.PreviousValue);
                }
            });
        }
        /**
         * @return {?}
         */
        reconcile() {
            this.operations.forEach((operation) => {
                if (!operation.IsLocal) {
                    switch (operation.Operation) {
                        case OperationType.Clear:
                            this.container.length = 0;
                            operation.ReconciledItemIndex = -1;
                            break;
                        case OperationType.Append:
                            if (operation.IsNewValueDefined) {
                                this.container.push(operation.NewValue);
                                operation.ReconciledItemIndex = this.container.length - 1;
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Append reconciliation');
                            }
                            break;
                        case OperationType.Insert:
                            if (operation.IsNewValueDefined) {
                                if (operation.ItemIndex < this.container.length) {
                                    this.container.splice(operation.ItemIndex, 0, operation.NewValue);
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    this.container.push(operation.NewValue);
                                    operation.ReconciledItemIndex = this.container.length - 1;
                                }
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Insert reconciliation');
                            }
                            break;
                        case OperationType.Remove:
                            if (operation.IsPreviousValueDefined) {
                                if (operation.ItemIndex < this.container.length) { // && operation.PreviousValue == this.container[operation.ItemIndex]) {
                                    this.container.splice(operation.ItemIndex, 1);
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    operation.ReconciledItemIndex = -1;
                                    /// \todo: @UB: Locate entry and remove it depending on previous value or fail reconcile if not found.
                                }
                            }
                            else {
                                console.error('Expected previous value during AppStateCollection.Remove reconciliation');
                            }
                            break;
                        case OperationType.Replace:
                            if (operation.IsNewValueDefined) {
                                if (operation.ItemIndex < this.container.length) {
                                    this.container[operation.ItemIndex] = operation.NewValue;
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    operation.ReconciledItemIndex = -1;
                                    /// \todo: @UB: Locate entry and replace it depending on previous value or fail reconcile if not found.
                                }
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Replace reconciliation');
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            super.beginTransaction();
            this.operations.length = 0;
        }
    }
    modelstageappstate.AppStateCollection = AppStateCollection;
    class AppStateClusterManagerBase {
        constructor() {
            /**
             * A vector managing pointers to all instances of the corresponding cluster type.
             */
            this.allInstances = [];
        }
        /**
         * Adds a new instance of the corresponding cluster type to this.
         * @protected
         * @param {?} instance
         * @return {?}
         */
        addInstance(instance) {
            instance.registerEntries();
            this.allInstances.push(instance);
        }
        /**
         * Starts the transactional phase. Changes to entries and their values may only be carried out
         * during the transactional phase.
         * @return {?}
         */
        beginTransaction() {
            for (let clusterKey in this.allInstances) {
                this.allInstances[clusterKey].beginTransaction();
            }
        }
        /**
         * Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        endTransaction() {
            for (let clusterKey in this.allInstances) {
                this.allInstances[clusterKey].endTransaction();
            }
        }
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state.
         * @param {?} scene
         * @return {?}
         */
        applyChanges(scene) {
            for (let clusterKey in this.allInstances) {
                /** @type {?} */
                let cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    cluster.applyChanges(scene, cluster.PeerID, cluster.InstanceID);
                    scene.setDirty();
                }
            }
        }
        /**
         * Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeClusterInstanceData(cluster, deltaWriter, appState) {
        }
        /**
         * Serializes all changes that have been carried out on clusters of the corresponding type.
         * @param {?} deltaWriter
         * @param {?} clusterID
         * @param {?} appState
         * @return {?}
         */
        serializeTransaction(deltaWriter, clusterID, appState) {
            /** @type {?} */
            let dirtyClusters = [];
            for (let clusterKey in this.allInstances) {
                /** @type {?} */
                let cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    dirtyClusters.push(cluster);
                }
            }
            if (dirtyClusters.length > 0) {
                deltaWriter.Writer.writeString(clusterID);
                deltaWriter.Writer.writeUInt16(dirtyClusters.length);
                dirtyClusters.forEach((cluster) => {
                    this.serializeClusterInstanceData(cluster, deltaWriter, appState);
                    cluster.serializeTransaction(deltaWriter, appState);
                });
            }
        }
        /**
         * Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            return false;
        }
    }
    modelstageappstate.AppStateClusterManagerBase = AppStateClusterManagerBase;
    /**
     * Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
     * @template TAppStateCluster
     */
    class GlobalAppStateClusterManager extends AppStateClusterManagerBase {
        /**
         * @param {?} clusterTypeID
         * @param {?} clusterType
         */
        constructor(clusterTypeID, clusterType) {
            super();
            this.clusterType = clusterType;
            this.onlyInstance = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, this);
            this.addInstance(this.onlyInstance);
        }
        /**
         * Gets the only instance of this cluster type.
         * @return {?}
         */
        getGlobalCluster() {
            return this.onlyInstance;
        }
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeClusterInstanceData(cluster, deltaWriter, appState) {
        }
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
         * additional data from the reader.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            /** @type {?} */
            let success = false;
            /** @type {?} */
            let instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    let cluster = this.getGlobalCluster();
                    success = cluster.deserializeTransaction(deltaReader, appState, scene);
                }
            }
            return success;
        }
    }
    modelstageappstate.GlobalAppStateClusterManager = GlobalAppStateClusterManager;
    /**
     * Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the
     * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
     * @template TAppStateCluster
     */
    class LocalAppStateClusterManager extends AppStateClusterManagerBase {
        /**
         * @param {?} clusterTypeID
         * @param {?} clusterType
         */
        constructor(clusterTypeID, clusterType) {
            super();
            this.clusterType = clusterType;
            /**
             * The map of cluster per peer.
             */
            this.peerClusters = {};
            this.peerClusters[''] = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, this);
            this.addInstance(this.peerClusters['']);
        }
        /**
         * Gets the local peer's instance of this cluster type.
         * @return {?}
         */
        getLocalCluster() {
            return (/** @type {?} */ (this.allInstances['']));
        }
        /**
         * \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
         * it's created.
         * @param {?} peerID
         * @return {?}
         */
        getCluster(peerID) {
            /** @type {?} */
            let result = null;
            if (!this.containsCluster(peerID)) {
                result = new this.clusterType();
                this.peerClusters[peerID] = result;
                result.PeerID = peerID;
                this.addInstance(result);
            }
            else {
                result = (/** @type {?} */ (this.peerClusters[peerID]));
            }
            return result;
        }
        /**
         * Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
         * @param {?} peerID
         * @return {?}
         */
        containsCluster(peerID) {
            return this.peerClusters[peerID] != null;
        }
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
         * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeClusterInstanceData(cluster, deltaWriter, appState) {
            /** @type {?} */
            let peerID = cluster.PeerID;
            // Use local peerID if the cluster's peer ID is empty.
            deltaWriter.Writer.writeString(peerID.length == 0 ? appState.LocalPeerID : peerID);
        }
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
         * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
         * key (empty string) that is used to identify local peer data.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            /** @type {?} */
            let success = false;
            /** @type {?} */
            let instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    let peerID = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        if (peerID == appState.LocalPeerID) {
                            peerID = '';
                        }
                        /** @type {?} */
                        let cluster = this.getCluster(peerID);
                        success = cluster.deserializeTransaction(deltaReader, appState, scene);
                    }
                }
            }
            return success;
        }
    }
    modelstageappstate.LocalAppStateClusterManager = LocalAppStateClusterManager;
    /**
     * AppStateCluster instances store information about the application state. Based on application state, changes
     * to the view state are carried out. In order to be able to synchronize application state, operations on the entries that
     * are aggregated by AppStateCluster,  are stored during a "transactional phase". Immediately afterwards, all changes are
     * collected and sync'ed with remote peers. Similarly, when remote changes are received, they are processed after the local
     * collection took place, causing app state changes. Finally, all cluster's entry's changes are processed to update the
     * application's view state.
     * @abstract
     */
    class AppStateCluster {
        /**
         * Constructor
         * @param {?=} peerID 		The peer ID this cluster instance belongs to. If it's left empty, the local peer's ID will be used.
         * @param {?=} instanceID 	The peer-unique instance ID. This ID is only necessary, if multi-instances are used (per peer). This depends on the AppStateClusterManager used to manage instances.
         * @param {?=} appState 		The app state container this cluster belongs to.
         */
        constructor(peerID, instanceID, appState) {
            this.entries = {};
            this.dirty = false;
            this.lockCount = 0;
            this.peerID = peerID || '';
            this.instanceID = instanceID || '';
            this.appState = appState || AppState.GetInstance();
        }
        /**
         * @return {?}
         */
        get PeerID() {
            return this.peerID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set PeerID(value) {
            this.peerID = value;
        }
        /**
         * @return {?}
         */
        get InstanceID() {
            return this.instanceID;
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            this.dirty = false;
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].beginTransaction();
            }
        }
        /**
         * @return {?}
         */
        endTransaction() {
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].endTransaction();
            }
        }
        /**
         * @private
         * @param {?} scene
         * @return {?}
         */
        reconcile(scene) {
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].reconcile();
            }
        }
        /**
         * @return {?}
         */
        setDirty() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.dirty;
        }
        /**
         * @param {?} key
         * @param {?} entry
         * @return {?}
         */
        registerEntry(key, entry) {
            this.entries[key] = entry;
            entry.register(key, this);
        }
        /**
         * ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
         * override ApplyChanges to update the view state based on the app state changes that occured.
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
        }
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeTransaction(deltaWriter, appState) {
            // setIsInitializing(deltaWriter.IsInitialization());
            // setIsInitializing(deltaWriter.IsInitialization());
            /** @type {?} */
            let dirtyEntries = [];
            for (let idx in this.entries) {
                if (this.entries[idx].isDirty()) {
                    dirtyEntries.push({ key: idx, entry: this.entries[idx] });
                }
            }
            deltaWriter.Writer.writeUInt16(dirtyEntries.length);
            dirtyEntries.forEach((e) => {
                e.entry.serializeDelta(deltaWriter, e.key);
            });
        }
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            /** @type {?} */
            let success = true;
            /** @type {?} */
            let entryCount = deltaReader.Reader.readUInt16();
            // setIsInitializing(deltaReader.IsInitializing());
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < entryCount && success; ++i) {
                    /** @type {?} */
                    let entryKey = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        /** @type {?} */
                        let entry = this.entries[entryKey];
                        if (entry) {
                            success = entry.deserializeDelta(deltaReader, entryKey);
                        }
                        else {
                            success = false;
                        }
                    }
                    else {
                        success = false;
                    }
                }
            }
            else {
                success = false;
            }
            if (success) {
                this.reconcile(scene);
            }
            return success;
        }
        /**
         * @return {?}
         */
        lock() {
            ++this.lockCount;
        }
        /**
         * @return {?}
         */
        unlock() {
            --this.lockCount;
        }
        /**
         * @return {?}
         */
        get IsLocked() {
            return this.lockCount > 0;
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            console.error('readValue not implemented for ' + key);
        }
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(key, writer, value) {
            console.error('writeValue not implemented for ' + key);
        }
    }
    modelstageappstate.AppStateCluster = AppStateCluster;
    class Director {
        /**
         * @param {?} appState
         */
        constructor(appState) {
            this.pendingUpdates = [];
            this.pendingMessages = [];
            this.appState = appState;
        }
        /**
         * @param {?} scene
         * @return {?}
         */
        set Scene(scene) {
            this.scene = scene;
        }
        /**
         * Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
         * BeginUpdate is called at the very beginning of each render cycle.
         * @return {?}
         */
        beginFrame() {
            this.appState.beginTransaction();
        }
        /**
         * @return {?}
         */
        commit() {
            this.acquirePendingUpdates().forEach((updFunc) => {
                updFunc();
            });
            this.appState.endTransaction();
        }
        /**
         * Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
         * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
         * @param {?} connection
         * @return {?}
         */
        submitLocalUpdates(connection) {
            /** @type {?} */
            const AppStateDelta = 0x0100;
            /** @type {?} */
            let writer = new AppStateDeltaWriter(new BinaryWriter());
            writer.Writer.writeInt32(1);
            writer.Writer.writeInt32(AppStateDelta);
            this.appState.serializeTransaction(writer);
            /** @type {?} */
            let buf = writer.Writer.flush();
            /** @type {?} */
            let msg = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
            if (msg.HasPayload && connection.IsConnected) {
                connection.send(msg.Content);
            }
        }
        /**
         * Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
         * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
         * @return {?}
         */
        applyRemoteUpdates() {
            /** @type {?} */
            let pendingMessages = this.acquirePendingMessages();
            pendingMessages.forEach((msg) => {
                this.appState.deserializeTransaction(new AppStateDeltaReader(new BinaryReader(msg.Content)), this.scene);
            });
        }
        /**
         * @private
         * @return {?}
         */
        acquirePendingUpdates() {
            /** @type {?} */
            let result = this.pendingUpdates;
            this.pendingUpdates = [];
            return result;
        }
        /**
         * @private
         * @return {?}
         */
        acquirePendingMessages() {
            /** @type {?} */
            let result = this.pendingMessages;
            this.pendingMessages = [];
            return result;
        }
        /**
         * Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
         * @return {?}
         */
        endFrame() {
            this.appState.applyChanges(this.scene);
        }
        /**
         * @param {?} message
         * @return {?}
         */
        receivedMessage(message) {
            this.pendingMessages.push(message);
        }
        /**
         * @param {?} func
         * @return {?}
         */
        synchronizeStateUpdate(func) {
            this.pendingUpdates.push(func);
        }
    }
    modelstageappstate.Director = Director;
    class DirectedSceneWebGL extends modelstageweb.SceneWebGL {
        /**
         * @param {?} director
         * @param {?} connection
         */
        constructor(director, connection) {
            super();
            this.director = director;
            this.connection = connection;
        }
        /**
         * @return {?}
         */
        beginFrame() {
            this.director.beginFrame();
        }
        /**
         * @return {?}
         */
        update() {
            this.director.commit();
            if (this.connection && this.connection.IsConnected) {
                this.director.submitLocalUpdates(this.connection);
                this.director.applyRemoteUpdates();
            }
        }
        /**
         * @return {?}
         */
        endFrame() {
            this.director.endFrame();
        }
        /**
         * @param {?} message
         * @return {?}
         */
        receivedMessage(message) {
            if (message.MessageType == modelstageweb.CommonMessageTypes.AppStateDelta || message.MessageType == modelstageweb.CommonMessageTypes.AppStateInitialization) {
                this.director.receivedMessage(message);
            }
        }
        /**
         * @param {?} func
         * @return {?}
         */
        synchronizeStateUpdate(func) {
            this.director.synchronizeStateUpdate(func);
        }
    }
    modelstageappstate.DirectedSceneWebGL = DirectedSceneWebGL;
})(modelstageappstate || (modelstageappstate = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var modelstage;
(function (modelstage) {
    class Timer {
        /**
         * @param {?} callback
         * @return {?}
         */
        animationFrame(callback) {
            return window.requestAnimationFrame(callback);
        }
        constructor() {
        }
    }
    class SpaceModel {
        /**
         * @param {?} scene
         * @param {?} stage
         * @param {?} actor
         */
        constructor(scene, stage, actor) {
            this.scene = scene;
            this.stage = stage;
            this.actor = actor;
            this.vertices = [];
            this.floorLevel = 0;
        }
        /**
         * @return {?}
         */
        get FloorLevel() { return this.floorLevel; }
        /**
         * @param {?} floorLevel
         * @return {?}
         */
        set FloorLevel(floorLevel) { this.floorLevel = floorLevel; }
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder) {
            texturedMeshBuilder.addQuad(-5.0, 0.0, -5.0, 0, 0, 5.0, 0.0, -5.0, 1, 0, 5.0, 0.0, 5.0, 1, 1, -5.0, 0.0, 5.0, 0, 1, 0.3, 0.3, 0.3, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, 5.0, 0.0, -5.0, 5.0, 2.6, -5.0, -5.0, 2.6, -5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, 5.0, -5.0, 2.6, 5.0, 5.0, 2.6, 5.0, 5.0, 0.0, 5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, -5.0, 2.6, -5.0, -5.0, 2.6, 5.0, -5.0, 0.0, 5.0, 0.15, 0.15, 0.15, .4, true);
            transparentMeshBuilder.addQuad(5.0, 0.0, -5.0, 5.0, 0.0, 5.0, 5.0, 2.6, 5.0, 5.0, 2.6, -5.0, 0.15, 0.15, 0.15, .4, true);
        }
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder) {
            /** @type {?} */
            let toggle = false;
            /** @type {?} */
            let poly = new psgeometry.Polygon2D();
            for (let i = 0; i < this.vertices.length; i++) {
                poly.addVector(this.vertices[i]);
            }
            /** @type {?} */
            var bbox = new psgeometry.AABB2D();
            poly.addToAABB(bbox);
            /** @type {?} */
            var extents = bbox.extents();
            this.stage.updateShadowArea(bbox);
            poly = poly.triangulate();
            for (let i = 0; i < poly.Vertices.length; i += 3) {
                texturedMeshBuilder.addTri(poly.Vertices[i].x, 0, poly.Vertices[i].y, (poly.Vertices[i].x - bbox.minX) / extents.x, (poly.Vertices[i].y - bbox.minY) / extents.y, poly.Vertices[i + 1].x, 0, poly.Vertices[i + 1].y, (poly.Vertices[i + 1].x - bbox.minX) / extents.x, (poly.Vertices[i + 1].y - bbox.minY) / extents.y, poly.Vertices[i + 2].x, 0, poly.Vertices[i + 2].y, (poly.Vertices[i + 2].x - bbox.minX) / extents.x, (poly.Vertices[i + 2].y - bbox.minY) / extents.y, 0.2, 0.2, 0.2, true);
            }
            for (let i = 0; i < this.vertices.length; i++) {
                /** @type {?} */
                let start = this.vertices[i];
                /** @type {?} */
                let end = this.vertices[(i + 1) % this.vertices.length];
                transparentMeshBuilder.addQuad(start.x, 0.0, start.y, end.x, 0.0, end.y, end.x, 2.6, end.y, start.x, 2.6, start.y, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, .4, true);
                toggle = !toggle;
            }
        }
        /**
         * @return {?}
         */
        updateSpace() {
            /** @type {?} */
            let spaceIndices = new modelstageweb.BufferAssetWebGL(undefined, 'space_indices', true);
            /** @type {?} */
            let spaceVertices = new modelstageweb.BufferAssetWebGL(undefined, 'space_vertices', false);
            /** @type {?} */
            let transparentMeshBuilder = new modelstageweb.TransparentMeshBuilder(spaceVertices, spaceIndices);
            /** @type {?} */
            let floorIndices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_indices', true);
            /** @type {?} */
            let floorVertices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_vertices', false);
            /** @type {?} */
            let texturedMeshBuilder = new modelstageweb.TexturedMeshBuilder(floorVertices, floorIndices);
            if (this.vertices.length < 3) {
                this.initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            else {
                this.initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            /** @type {?} */
            let figure = new modelstageweb.FigureWebGL('Space');
            texturedMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('floor_indices', floorIndices);
            this.stage.AssetStore.addBufferAsset('floor_vertices', floorVertices);
            /** @type {?} */
            let floorShaderInstance = new modelstageweb.MeshShaderInstance('TexturedMeshShader');
            floorShaderInstance.addReference('IndexBuffer', 'floor_indices');
            floorShaderInstance.addReference('VertexBuffer', 'floor_vertices');
            floorShaderInstance.addReference('TextureBuffer', 'Shadow');
            figure.addShaderInstance(floorShaderInstance);
            transparentMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('space_indices', spaceIndices);
            this.stage.AssetStore.addBufferAsset('space_vertices', spaceVertices);
            /** @type {?} */
            let shaderInstance = new modelstageweb.MeshShaderInstance('TransparentMeshShader');
            shaderInstance.addReference('IndexBuffer', 'space_indices');
            shaderInstance.addReference('VertexBuffer', 'space_vertices');
            figure.addShaderInstance(shaderInstance);
            this.actor.Figures[0] = figure;
            this.actor.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
            this.actor.Scene.setDirty();
        }
        /**
         * @return {?}
         */
        clearVertices() {
            this.vertices.length = 0;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        addVertex(x, y) {
            this.vertices.push(new psgeometry.Vec2(x, y));
        }
    }
    modelstage.SpaceModel = SpaceModel;
    class TheaterWebGL {
        /**
         * @param {?} canvasElementID
         */
        constructor(canvasElementID) {
            this.stage = new modelstageweb.StageWebGL(canvasElementID);
            this.stage.initialize();
            //this.scene = new modelstageweb.SceneWebGL();
            this.timer = new Timer();
            this.timer.animationFrame(() => { this.processFrame(); });
            document.addEventListener('visibilitychange', () => { this.onVisibilityChange(); }, false);
            this.initialize();
        }
        /**
         * @return {?}
         */
        get Stage() {
            return this.stage;
        }
        /**
         * @return {?}
         */
        get Scene() {
            return this.scene;
        }
        /**
         * @protected
         * @return {?}
         */
        initialize() {
        }
        /**
         * Main render cycle for a frame.
         * @protected
         * @return {?}
         */
        processFrame() {
            if (this.scene && this.scene.IsInitialized) {
                if (!document.hidden) {
                    // Render scene.
                    this.render();
                }
                // Process available interaction data and remote messages to update application state and/or view state for the next frame.
                this.scene.update();
                // Finalize frame.
                this.scene.endFrame();
                this.scene.beginFrame();
            }
            this.timer.animationFrame(() => { this.processFrame(); });
        }
        /**
         * @protected
         * @return {?}
         */
        render() {
            if (this.scene.IsInitialized) {
                this.stage.render(this.scene);
            }
        }
        /**
         * @private
         * @return {?}
         */
        onVisibilityChange() {
            if (!document.hidden) {
                this.timer.animationFrame(() => { this.render(); });
            }
        }
    }
    modelstage.TheaterWebGL = TheaterWebGL;
    class ActorManipulationTool extends modelstageweb.Tool {
        /**
         * @param {?} connection
         */
        constructor(connection) {
            super();
            this.connection = connection;
        }
        /**
         * @protected
         * @param {?} objID
         * @return {?}
         */
        getSceneObj(objID) {
            /** @type {?} */
            let sceneObjIdx = 0;
            /** @type {?} */
            let sceneObj = null;
            while (sceneObjIdx < SceneAppState.GlobalInstance.SceneObjects.Count && !sceneObj) {
                if (SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx).SceneObjectID == objID) {
                    sceneObj = SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx);
                }
                else {
                    ++sceneObjIdx;
                }
            }
            return [sceneObj, sceneObjIdx];
        }
        /**
         * @private
         * @param {?} actor
         * @return {?}
         */
        updateModelTransform(actor) {
            /** @type {?} */
            let translationVec = actor.Data['translate'] || psgeometry.Vec4.Zero;
            /** @type {?} */
            let rotationVec = actor.Data['rotate'] || psgeometry.Vec4.Zero;
            this.connection.send('Scene|Transform|' + actor.SceneItemID + '|' + translationVec.x + ',' + translationVec.y + ',' + translationVec.z + '|' + rotationVec.y + ',' + rotationVec.x + ',' + rotationVec.z);
            /** @type {?} */
            let translation = psgeometry.Matrix4.FromTranslation(translationVec.x, translationVec.y, translationVec.z);
            /** @type {?} */
            let rotation = psgeometry.Matrix4.FromRotationY(rotationVec.y);
            actor.State.set('ModelTransform', (/** @type {?} */ (rotation.multiply(translation))));
            actor.Scene.setDirty();
        }
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        updateActorTranslation(actor, x, y, z) {
            actor.Data['translate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        }
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        updateActorRotation(actor, x, y, z) {
            actor.Data['rotate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        }
    }
    modelstage.ActorManipulationTool = ActorManipulationTool;
    class SelectionTool extends ActorManipulationTool {
        /**
         * @param {?} scene
         * @param {?} stage
         * @param {?} connection
         */
        constructor(scene, stage, connection) {
            super(connection);
            this.scene = scene;
            this.stage = stage;
        }
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        enter(interfaceController) {
            super.enter(interfaceController);
            this.updateSelectionMarker();
        }
        /**
         * @return {?}
         */
        leave() {
            this.removeSelectionMarker();
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleKeyUp(e) {
            if (e.keyCode == 46 && this.selectedActor) { // delete key
                // delete key
                let [sceneObj, sceneObjIdx] = this.getSceneObj(this.selectedActor.Data['SceneObjID']);
                if (sceneObj) {
                    SceneAppState.GlobalInstance.SceneObjects.remove(sceneObjIdx);
                    this.removeSelectionMarker();
                    this.selectedActor = null;
                    return true;
                }
            }
            return false;
        }
        /**
         * @private
         * @return {?}
         */
        removeSelectionMarker() {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
        }
        /**
         * @private
         * @return {?}
         */
        updateSelectionMarker() {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
            if (this.selectedActor) {
                /** @type {?} */
                let box = new psgeometry.AABB3D;
                this.selectedActor.Figures.forEach((fig) => {
                    box.addAABB(fig.getBoundingBox());
                });
                /** @type {?} */
                let bottomCenterPoint = new psgeometry.Vec3(box.center().x, box.minY, box.center().z);
                /** @type {?} */
                let selectionMarker = new modelstageweb.ActorWebGL(this.scene, SelectionTool.SelectionObjectID);
                let [r, g, b] = [.16, .34, .6];
                /** @type {?} */
                let meshBuilder = new modelstageweb.OpaqueMeshBuilder();
                // top lid
                meshBuilder.addStroke(box.minX, box.maxY, box.minZ, box.maxX, box.maxY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.maxY, box.minZ, box.maxX, box.maxY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.maxY, box.maxZ, box.minX, box.maxY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.minX, box.maxY, box.maxZ, box.minX, box.maxY, box.minZ, r, g, b);
                // bottom lid
                meshBuilder.addStroke(box.minX, box.minY, box.minZ, box.maxX, box.minY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.minZ, box.maxX, box.minY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.maxZ, box.minX, box.minY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.minX, box.minY, box.maxZ, box.minX, box.minY, box.minZ, r, g, b);
                // vertical lines
                meshBuilder.addStroke(box.minX, box.minY, box.minZ, box.minX, box.maxY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.minX, box.minY, box.maxZ, box.minX, box.maxY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.minZ, box.maxX, box.maxY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.maxZ, box.maxX, box.maxY, box.maxZ, r, g, b);
                selectionMarker.addFigure(meshBuilder.createFigure(this.stage, 'SEL_MARKER'));
                /** @type {?} */
                let figureBoundingBox = new psgeometry.AABB3D();
                [r, g, b] = [.6, .1, .1];
                /** @type {?} */
                let meshBuilder1 = new modelstageweb.OpaqueMeshBuilder();
                /** @type {?} */
                const segmentCount = 24;
                /** @type {?} */
                const radius0 = 1;
                /** @type {?} */
                const radius1 = 1.1;
                for (let i = 0; i < segmentCount; ++i) {
                    /** @type {?} */
                    let angle0 = 2 * Math.PI / segmentCount * i;
                    /** @type {?} */
                    let angle1 = 2 * Math.PI / segmentCount * (i + 1);
                    /** @type {?} */
                    let inner0 = new psgeometry.Vec3(Math.sin(angle0) * radius0, 0, Math.cos(angle0) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    let inner1 = new psgeometry.Vec3(Math.sin(angle1) * radius0, 0, Math.cos(angle1) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    let outer0 = new psgeometry.Vec3(Math.sin(angle0) * radius1, 0, Math.cos(angle0) * radius1).add(bottomCenterPoint);
                    /** @type {?} */
                    let outer1 = new psgeometry.Vec3(Math.sin(angle1) * radius1, 0, Math.cos(angle1) * radius1).add(bottomCenterPoint);
                    meshBuilder1.addQuad(outer0.x, outer0.y + 0.02, outer0.z, outer1.x, outer1.y + 0.02, outer1.z, inner1.x, inner1.y + 0.02, inner1.z, inner0.x, inner0.y + 0.02, inner0.z, r, g, b);
                    meshBuilder1.addQuad(outer0.x, outer1.y - 0.02, outer0.z, outer1.x, outer1.y - 0.02, outer1.z, outer1.x, outer1.y + 0.02, outer1.z, outer0.x, outer0.y + 0.02, outer0.z, r, g, b);
                    meshBuilder1.addQuad(inner0.x, inner0.y - 0.02, inner0.z, inner1.x, inner1.y - 0.02, inner1.z, outer1.x, outer1.y - 0.02, outer1.z, outer0.x, outer0.y - 0.02, outer0.z, r, g, b);
                    figureBoundingBox.addVector(outer0);
                }
                /** @type {?} */
                let figure = meshBuilder1.createFigure(this.stage, 'ROT_MARKER');
                figure.setIntersector(new modelstageweb.BoundingBoxIntersector(figureBoundingBox));
                selectionMarker.addFigure(figure);
                /** @type {?} */
                let sceneObjTranslation = this.scene.State.get('SceneObjectPos' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                /** @type {?} */
                let sceneObjRotation = this.scene.State.get('SceneObjectRot' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                selectionMarker.State.set('ModelTransform', psgeometry.Matrix4.FromRotation(sceneObjRotation.x, sceneObjRotation.y, sceneObjRotation.z).multiply(psgeometry.Matrix4.FromTranslation(sceneObjTranslation.x, sceneObjTranslation.y, sceneObjTranslation.z)));
                selectionMarker.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
                this.scene.addSceneItem(selectionMarker, true);
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseDown(e) {
            /** @type {?} */
            let viewRay = this.stage.Camera.getViewRay(e.clientX, e.clientY);
            /** @type {?} */
            let candidates = [];
            this.scene.getIntersectionCandidates(viewRay, candidates);
            /** @type {?} */
            let pickedObject = false;
            /** @type {?} */
            let currentIdx = 0;
            while (!pickedObject && currentIdx < candidates.length) {
                if (candidates[currentIdx].sceneItem instanceof modelstageweb.ActorWebGL) {
                    /** @type {?} */
                    let pickedActor = (/** @type {?} */ ((candidates[currentIdx].sceneItem)));
                    if (pickedActor.SceneItemID != SelectionTool.SelectionObjectID) {
                        if (pickedActor == this.selectedActor) {
                            this.interfaceController.pushTool(new MoveActorTool(pickedActor, this.stage.Camera, this.connection));
                        }
                        else {
                            this.selectedActor = pickedActor;
                            this.updateSelectionMarker();
                        }
                        pickedObject = true;
                    }
                    else {
                        this.interfaceController.pushTool(new RotateActorTool(this.selectedActor, this.stage.Camera, this.connection));
                        pickedObject = true;
                    }
                }
                currentIdx++;
            }
            if (!pickedObject) {
                this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
                this.selectedActor = null;
            }
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) {
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
        }
    }
    SelectionTool.SelectionObjectID = 'SEL_MARKER';
    modelstage.SelectionTool = SelectionTool;
    class PlaceActorTool extends ActorManipulationTool {
        /**
         * @param {?} figureID
         * @param {?} camera
         * @param {?} connection
         */
        constructor(figureID, camera, connection) {
            super(connection);
            this.camera = camera;
            this.sceneObj = new SceneObject();
            this.sceneObj.AssetID = figureID;
            this.sceneObj.SceneObjectID = modelstageweb.uuidv4();
            this.sceneObj.Location = new psgeometry.Vec4();
            this.sceneObj.Rotation = new psgeometry.Vec4();
            this.sceneObj.Scale = new psgeometry.Vec4(1, 1, 1, 1);
            SceneAppState.GlobalInstance.SceneObjects.append(this.sceneObj);
            this.sceneObjIdx = SceneAppState.GlobalInstance.SceneObjects.Count - 1;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) {
            /** @type {?} */
            let viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            let p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                this.sceneObj = Object.assign({}, this.sceneObj);
                this.sceneObj.Location = new psgeometry.Vec4(p.x, 0, p.z);
                SceneAppState.GlobalInstance.SceneObjects.replace(this.sceneObj, this.sceneObjIdx);
                //this.updateActorTranslation(this.actor, p.x, 0, p.z);
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
            this.interfaceController.popTool();
        }
    }
    modelstage.PlaceActorTool = PlaceActorTool;
    /** @type {?} */
    let UserNames = {
        'Administrator': 'Administrator',
        'Arne': 'Arne Thurm',
        'Ulrich': 'Ulrich Bönkemeyer',
        'Tom': 'Tom Jachmann',
        'Zacharias': 'Zacharias Reinhardt'
    };
    /** @type {?} */
    let PeerColors = [
        [0.31, 0.02, 0.06, 1.00],
        [0.02, 0.17, 0.31, 1.00],
        [0.02, 0.31, 0.06, 1.00],
        [0.69, 0.34, 0.00, 1.00],
        [0.33, 0.00, 0.53, 1.00],
    ];
    class MoveActorTool extends ActorManipulationTool {
        /**
         * @param {?} actor
         * @param {?} camera
         * @param {?} connection
         */
        constructor(actor, camera, connection) {
            super(connection);
            this.actor = actor;
            this.camera = camera;
            this.isInitialized = false;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) {
            /** @type {?} */
            let viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            let p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                if (this.isInitialized) {
                    let [sceneObj, sceneObjIdx] = this.getSceneObj(this.actor.Data['SceneObjID']);
                    if (sceneObj) {
                        /** @type {?} */
                        let translatedSceneObj = Object.assign({}, sceneObj);
                        /** @type {?} */
                        let translation = translatedSceneObj.Location;
                        translatedSceneObj.Location = translatedSceneObj.Location.add(new psgeometry.Vec4(p.x - this.lastX, 0, p.z - this.lastZ));
                        SceneAppState.GlobalInstance.SceneObjects.replace(translatedSceneObj, sceneObjIdx);
                    }
                }
                this.lastX = p.x;
                this.lastZ = p.z;
                this.isInitialized = true;
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
            this.interfaceController.popTool();
        }
    }
    modelstage.MoveActorTool = MoveActorTool;
    class RotateActorTool extends ActorManipulationTool {
        /**
         * @param {?} actor
         * @param {?} camera
         * @param {?} connection
         */
        constructor(actor, camera, connection) {
            super(connection);
            this.actor = actor;
            this.camera = camera;
        }
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        handleDrag(e, startX, startY, dX, dY) {
            /** @type {?} */
            let fac = 1;
            if (Math.abs(e.clientY - startY) > 300) {
                fac = 6;
            }
            else if (Math.abs(e.clientY - startY) > 200) {
                fac = 3;
            }
            else if (Math.abs(e.clientY - startY) > 100) {
                fac = 2;
            }
            let [sceneObj, sceneObjIdx] = this.getSceneObj(this.actor.Data['SceneObjID']);
            if (sceneObj) {
                /** @type {?} */
                let rotatedSceneObj = Object.assign({}, sceneObj);
                /** @type {?} */
                let rotation = rotatedSceneObj.Rotation;
                rotatedSceneObj.Rotation = rotatedSceneObj.Rotation.add(new psgeometry.Vec4(dX / (fac * 100) * Math.PI, 0, 0));
                SceneAppState.GlobalInstance.SceneObjects.replace(rotatedSceneObj, sceneObjIdx);
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
            this.interfaceController.popTool();
        }
    }
    modelstage.RotateActorTool = RotateActorTool;
    class DemoSceneWebGL extends modelstageappstate.DirectedSceneWebGL {
        /**
         * @param {?} stage
         * @param {?} connection
         */
        constructor(stage, connection) {
            super(new modelstageappstate.Director(modelstageappstate.AppState.GetInstance()), connection);
            this.spaceActor = new modelstageweb.ActorWebGL(this, 'Space');
            this.director.Scene = this;
            this.stage = stage;
            this.spaceModel = new SpaceModel(this, this.stage, this.spaceActor);
            /** @type {?} */
            let shaderProgram = new modelstageweb.OpaqueMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('OpaqueMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.TransparentMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('TransparentMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.TexturedMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('TexturedMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.MatCapShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('MatCapMeshShader', shaderProgram);
            // Shadow shaders
            shaderProgram = new modelstageweb.ShadowTexturedMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerPhaseSpecificShaderProgram('Shadow', 'TexturedMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.ShadowTexturedMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerPhaseSpecificShaderProgram('Shadow', 'MatCapMeshShader', shaderProgram);
        }
        /**
         * @return {?}
         */
        get SpaceModel() { return this.spaceModel; }
        /**
         * @return {?}
         */
        initialize() {
            this.addSceneItem(this.spaceActor, true);
            this.spaceModel.updateSpace();
            $.when(
            //                this.stage.AssetFactory.getFromUrl('/data/commonassets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/hologem.psmesh'), 
            //                this.stage.AssetFactory.getFromUrl('/data/office_assets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/office_assets_bake.psmesh')).done(() => {
                this.IsInitialized = true;
            });
            /*        this.stage.AssetFactory.getFromUrl('/data/if5-office-1.psmesh')
                        .then((success) => {
                            let actor = new modelstageweb.ActorWebGL(this, 'actor');
                            for (let x in this.stage.AssetStore.Figures) {
                                actor.addFigure(this.stage.AssetStore.Figures[x]);
                            }
                            this.addSceneItem(actor, true);
            
                            this.stage.AssetFactory.getFromUrl('/data/assets.psmesh').then(() => {
                                this.IsInitialized = true;
                            });
                        })
                        .fail((req) => {
                        })
                        .progress((percentage) => {
                            document.title = percentage;
                        });
                    */
        }
        /**
         * @return {?}
         */
        updateSpace() {
            this.spaceModel.clearVertices();
            for (let i = 0; i < RoomAppState.GlobalInstance.Vertices.Count; ++i) {
                /** @type {?} */
                let vert = RoomAppState.GlobalInstance.Vertices.GetItemAt(i);
                this.spaceModel.addVertex(vert.x, vert.z);
            }
            this.spaceModel.updateSpace();
        }
        /**
         * @param {?} peerID
         * @param {?} peerColorIndex
         * @param {?} userName
         * @return {?}
         */
        updatePeerInfo(peerID, peerColorIndex, userName) {
            if (peerID != '-1') {
                /** @type {?} */
                let peerInfoID = 'peer-info-' + peerID;
                /** @type {?} */
                let peerInfoElement = $('#' + peerInfoID);
                if (peerInfoElement.length > 0) {
                    peerInfoElement.find('span').text(userName);
                }
                else {
                    $('#participants-view').append('<li id="' + peerInfoID + '"><img src="images/info/Lens' + peerColorIndex + '.png" /><span>' + userName + '</span></li>');
                }
            }
        }
        /**
         * @param {?} peerID
         * @return {?}
         */
        removePeer(peerID) {
            this.removeSceneItem('Peer' + peerID);
            /** @type {?} */
            let peerInfoID = 'peer-info-' + peerID;
            /** @type {?} */
            let peerInfoElement = $('#' + peerInfoID);
            peerInfoElement.addClass('removing');
            setTimeout(() => {
                peerInfoElement.remove();
            }, 2000);
        }
        /**
         * @param {?} peerID
         * @return {?}
         */
        getColorIndexFromPeerID(peerID) {
            return (parseInt(peerID) - 1) % PeerColors.length;
        }
        /**
         * @param {?} peerID
         * @return {?}
         */
        createPeer(peerID) {
            /** @type {?} */
            let obj = new modelstageweb.ActorWebGL(this, 'Peer' + peerID);
            obj.addFigure(this.stage.AssetStore.Figures['hololens.hololens.000']);
            // TODO @UB: do this the right way...
            obj.Figures[0].ShaderInstances[0].ShaderKey = 'MatCapMeshShader';
            /** @type {?} */
            let colorIndex = this.getColorIndexFromPeerID(peerID);
            obj.State.set('Color', new psgeometry.Vec4(PeerColors[colorIndex][0], PeerColors[colorIndex][1], PeerColors[colorIndex][2], PeerColors[colorIndex][3]));
            obj.State.set('ModelTransform', (state) => {
                /** @type {?} */
                let pos = state.get('HeadPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                let cursor = state.get('CursPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                let dir = cursor.sub(pos);
                /** @type {?} */
                let spherical = psgeometry.Spherical.FromCartesianVector(dir);
                return ((/** @type {?} */ (psgeometry.Matrix4.FromRotationX(-spherical.azimuth).multiply(psgeometry.Matrix4.FromRotationY(-spherical.polar))))).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z));
            });
            this.addSceneItem(obj, true /* makeVisible */);
            obj.TestIntersection = false;
            obj.TestChildrenIntersection = false;
            return obj;
        }
        /**
         * @param {?} objectID
         * @param {?} assetID
         * @return {?}
         */
        createSceneObject(objectID, assetID) {
            /** @type {?} */
            let suffix = objectID;
            /** @type {?} */
            let obj = new modelstageweb.ActorWebGL(this, 'SceneObject' + suffix);
            obj.State.set('ModelTransform', (state) => {
                /** @type {?} */
                let pos = state.get('SceneObjectPos' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                let rot = state.get('SceneObjectRot' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                let scale = state.get('SceneObjectScale' + suffix, psgeometry.Vec4.One);
                return (/** @type {?} */ (psgeometry.Matrix4.FromRotation(rot.x, rot.y, rot.z).multiply(psgeometry.Matrix4.FromScaling(scale.x, scale.y, scale.z).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z)))));
            });
            obj.addFigure(this.stage.AssetStore.getFigure(assetID));
            obj.Data['SceneObjID'] = suffix;
            return obj;
        }
    }
    modelstage.DemoSceneWebGL = DemoSceneWebGL;
    class RoomAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super();
            this.FloorLevel = new modelstageappstate.AppStateFloatValue();
            this.MasterView = new modelstageappstate.AppStateVector4Value();
            this.Vertices = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            RoomAppState.GlobalInstance = this;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('FloorLevel', this.FloorLevel);
            this.registerEntry('MasterView', this.MasterView);
            this.registerEntry('Vertices', this.Vertices);
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            if (key == 'Vertices') {
                return reader.Reader.readVec4();
            }
            else {
                return super.readValue(key, reader);
            }
        }
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
            if (this.FloorLevel.isDirty()) {
                scene.State.set('FloorLevel', this.FloorLevel.get());
                ((/** @type {?} */ (scene))).SpaceModel.FloorLevel = this.FloorLevel.get();
            }
            if (this.MasterView.isDirty()) {
                scene.State.set('MasterViewPos', this.MasterView.get());
            }
            if (this.Vertices.isDirty()) {
                ((/** @type {?} */ (scene))).updateSpace();
            }
        }
    }
    RoomAppState.ClusterTypeID = 'Room';
    modelstage.RoomAppState = RoomAppState;
    class SceneObject {
    }
    class SceneAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super();
            this.SceneObjects = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            SceneAppState.GlobalInstance = this;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('Obj', this.SceneObjects);
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            if (key == 'Obj') {
                /** @type {?} */
                let value = new SceneObject();
                value.SceneObjectID = reader.Reader.readCharArray(40);
                value.AssetID = reader.Reader.readCharArray(40);
                value.Location = reader.Reader.readVec4();
                value.Rotation = reader.Reader.readVec4();
                value.Scale = reader.Reader.readVec4();
                return value;
            }
            else {
                return super.readValue(key, reader);
            }
        }
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(key, writer, value) {
            if (key == 'Obj') {
                writer.Writer.writeCharArray(value.SceneObjectID, 40);
                writer.Writer.writeCharArray(value.AssetID, 40);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeVec4(value.Rotation);
                writer.Writer.writeVec4(psgeometry.Vec4.One);
            }
            else {
                super.writeValue(key, writer, value);
            }
        }
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
            if (this.SceneObjects.isDirty()) {
                /** @type {?} */
                let sc = (/** @type {?} */ ((scene)));
                this.SceneObjects.Operations.forEach((operation) => {
                    if (operation.Operation == modelstageappstate.OperationType.Append) {
                        /** @type {?} */
                        let objID = operation.NewValue.SceneObjectID;
                        /** @type {?} */
                        let assetID = operation.NewValue.AssetID;
                        sc.addSceneItem(sc.createSceneObject(objID, assetID), true /* makeVisible */);
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                        //scene.RunSequence("ShowSceneObject", std::string{ "ShowSceneObject" } +noteID, { { "SceneObjectID", objID } });
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Replace) {
                        /** @type {?} */
                        let objID = operation.NewValue.SceneObjectID;
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Remove) {
                        /** @type {?} */
                        let objID = operation.PreviousValue.SceneObjectID;
                        scene.removeSceneItem('SceneObject' + objID);
                    }
                });
            }
        }
    }
    SceneAppState.ClusterTypeID = 'Obj';
    modelstage.SceneAppState = SceneAppState;
    class PeerAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super(...arguments);
            this.headPos = new modelstageappstate.AppStateVector4Value();
            this.cursorPos = new modelstageappstate.AppStateVector4Value();
            this.userID = new modelstageappstate.AppStateStringValue();
            this.active = new modelstageappstate.AppStateBoolValue();
        }
        /**
         * @return {?}
         */
        providesInitializationData() {
            return true;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('Head', this.headPos);
            this.registerEntry('Curs', this.cursorPos);
            this.registerEntry('User', this.userID);
            this.registerEntry('Active', this.active);
        }
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
            /** @type {?} */
            let sc = (/** @type {?} */ (scene));
            if (peerID.length > 0 && (this.headPos.isDirty() || this.cursorPos.isDirty())) {
                if (!sc.getSceneItem('Peer' + peerID)) {
                    sc.createPeer(peerID);
                }
                /** @type {?} */
                let levelOfs = new psgeometry.Vec4(0, -sc.SpaceModel.FloorLevel, 0, 0);
                /** @type {?} */
                let headPos = this.headPos.get();
                /** @type {?} */
                let cursorPos = this.cursorPos.get();
                if (headPos && cursorPos) {
                    scene.State.set('HeadPos' + peerID, headPos.add(levelOfs));
                    scene.State.set('CursPos' + peerID, cursorPos.add(levelOfs));
                }
            }
            if (this.userID.isDirty()) {
                /** @type {?} */
                let userName = UserNames[this.userID.get()] || '';
                sc.updatePeerInfo(peerID, sc.getColorIndexFromPeerID(peerID), userName);
            }
            if (this.active.isDirty()) {
                if (!this.active.get()) {
                    sc.removePeer(peerID);
                }
            }
        }
    }
    PeerAppState.ClusterTypeID = 'Peer';
    modelstage.PeerAppState = PeerAppState;
    class Note {
    }
    class NotesAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super();
            this.Notes = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            NotesAppState.GlobalInstance = this;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('Notes', this.Notes);
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            if (key == 'Notes') {
                /** @type {?} */
                let value = new Note();
                value.NoteID = reader.Reader.readCharArray(20);
                value.NoteType = reader.Reader.readUInt32();
                value.OwnerID = reader.Reader.readCharArray(10);
                value.Location = reader.Reader.readVec4();
                value.AzimuthalRotation = reader.Reader.readFloat32();
                return value;
            }
            else {
                return super.readValue(key, reader);
            }
        }
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(key, writer, value) {
            if (key == 'Notes') {
                writer.Writer.writeCharArray(value.NoteID, 20);
                writer.Writer.writeInt32(value.NoteType);
                writer.Writer.writeCharArray(value.OwnerID, 10);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeFloat32(value.AzimuthalRotation);
            }
            else {
                super.writeValue(key, writer, value);
            }
        }
    }
    NotesAppState.ClusterTypeID = 'Notes';
    modelstage.NotesAppState = NotesAppState;
})(modelstage || (modelstage = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MessageChannel {
    /**
     * @protected
     * @param {?} message
     * @return {?}
     */
    extractPart(message) {
        /** @type {?} */
        let sep = message.indexOf('|');
        if (sep >= 0) {
            return {
                part: message.substring(0, sep),
                remainder: message.substring(sep + 1)
            };
        }
        else {
            return {
                remainder: '',
                part: message
            };
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    processMessage(message) {
    }
}
class SampleTheaterWebGL extends modelstage.TheaterWebGL {
    /**
     * @param {?} canvasElementID
     */
    constructor(canvasElementID) {
        super(canvasElementID);
        this.peerAppState = new modelstageappstate.LocalAppStateClusterManager(modelstage.PeerAppState.ClusterTypeID, modelstage.PeerAppState);
        this.sceneAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.SceneAppState.ClusterTypeID, modelstage.SceneAppState);
        this.roomAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.RoomAppState.ClusterTypeID, modelstage.RoomAppState);
        this.notesAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.NotesAppState.ClusterTypeID, modelstage.NotesAppState);
        this.actorIndex = 1;
        this.channels = {};
        this.connection = new modelstageweb.SignalRServerConnection();
        this.scene = new modelstage.DemoSceneWebGL(this.stage, this.connection);
        this.scene.initialize();
        this.connection.onConnected(() => {
        });
        this.connection.onMessage((msg) => {
            if (msg.data instanceof ArrayBuffer || msg.data instanceof Uint8Array) {
                /** @type {?} */
                let buf = msg.data instanceof Uint8Array ? msg.data : new Uint8Array(msg.data);
                /** @type {?} */
                let networkMessage = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
                ((/** @type {?} */ (this.scene))).receivedMessage(networkMessage);
            }
            else if (typeof msg.data == 'string') {
                /** @type {?} */
                let data = (/** @type {?} */ (msg.data));
                /** @type {?} */
                let sep = data.indexOf('|');
                if (sep >= 0) {
                    /** @type {?} */
                    let channelKey = data.substring(0, sep);
                    /** @type {?} */
                    let message = data.substr(sep + 1);
                    /** @type {?} */
                    let channel = this.channels[channelKey];
                    if (channel) {
                        channel.processMessage(message);
                    }
                }
            }
            else {
                console.warn('Received invalid message type: ' + typeof msg.data);
            }
        });
        this.interfaceController = new modelstageweb.InterfaceController();
        this.cameraController = new modelstageweb.CameraController(this.Stage, this.Stage.Camera, this.interfaceController, this.connection);
        this.cameraController.construct(12.0, -0.45, 0.0);
        this.interfaceController.pushTool(new modelstage.SelectionTool(this.scene, this.stage, this.connection));
        $(() => {
            this.connection.connect();
            ((/** @type {?} */ ($('.area-right-sidebar ul li')))).draggable({
                containment: 'document',
                cursor: 'crosshair',
                helper: 'clone',
                opacity: 0.5,
                scroll: false
            });
            ((/** @type {?} */ ($('#viewCanvas')))).droppable({
                over: (event, ui) => {
                    /** @type {?} */
                    let figureID = $(ui.draggable).attr('data-figure-id');
                    //actor.Data['rotate'] = new psgeometry.Vec4(0, this.cameraController.Yaw, 0);
                    this.interfaceController.pushTool(new modelstage.PlaceActorTool(figureID, this.stage.Camera, this.connection));
                }
            });
        });
    }
    /**
     * @protected
     * @return {?}
     */
    initialize() {
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { psgeometry, modelstageweb, modelstageappstate, modelstage, MessageChannel, SampleTheaterWebGL, modelstage as ɵa };

//# sourceMappingURL=ngx-modelstage.js.map