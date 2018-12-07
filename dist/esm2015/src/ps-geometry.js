/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
export var psgeometry;
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
    if (false) {
        /** @type {?} */
        Matrix4.Identity;
        /** @type {?} */
        Matrix4.prototype.elements;
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
    }
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
    if (false) {
        /** @type {?} */
        Matrix3.Identity;
        /** @type {?} */
        Matrix3.prototype.elements;
    }
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
    if (false) {
        /** @type {?} */
        Vec3.prototype.x;
        /** @type {?} */
        Vec3.prototype.y;
        /** @type {?} */
        Vec3.prototype.z;
    }
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
    if (false) {
        /** @type {?} */
        Vec4.Zero;
        /** @type {?} */
        Vec4.One;
        /** @type {?} */
        Vec4.prototype.x;
        /** @type {?} */
        Vec4.prototype.y;
        /** @type {?} */
        Vec4.prototype.z;
        /** @type {?} */
        Vec4.prototype.w;
    }
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
    if (false) {
        /** @type {?} */
        Quaternion.prototype.x;
        /** @type {?} */
        Quaternion.prototype.y;
        /** @type {?} */
        Quaternion.prototype.z;
        /** @type {?} */
        Quaternion.prototype.w;
    }
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
    if (false) {
        /** @type {?} */
        AABB3D.prototype.minX;
        /** @type {?} */
        AABB3D.prototype.maxX;
        /** @type {?} */
        AABB3D.prototype.minY;
        /** @type {?} */
        AABB3D.prototype.maxY;
        /** @type {?} */
        AABB3D.prototype.minZ;
        /** @type {?} */
        AABB3D.prototype.maxZ;
    }
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
    if (false) {
        /** @type {?} */
        Point3D.prototype.x;
        /** @type {?} */
        Point3D.prototype.y;
        /** @type {?} */
        Point3D.prototype.z;
    }
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
    if (false) {
        /** @type {?} */
        Line3D.prototype.p0;
        /** @type {?} */
        Line3D.prototype.p1;
    }
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
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Camera.prototype._position;
        /**
         * @type {?}
         * @private
         */
        Camera.prototype._direction;
        /**
         * @type {?}
         * @private
         */
        Camera.prototype._up;
        /**
         * @type {?}
         * @private
         */
        Camera.prototype.currentViewMatrix;
    }
    /**
     * @param {?} p
     * @param {?} a
     * @param {?} b
     * @param {?} c
     * @return {?}
     */
    function pointInTriangle(p, a, b, c) {
        // Compute vectors        
        /** @type {?} */
        let v0 = c.subtract(a);
        /** @type {?} */
        let v1 = b.subtract(a);
        /** @type {?} */
        let v2 = p.subtract(a);
        // Compute dot products
        /** @type {?} */
        let dot00 = v0.dot(v0);
        /** @type {?} */
        let dot01 = v0.dot(v1);
        /** @type {?} */
        let dot02 = v0.dot(v2);
        /** @type {?} */
        let dot11 = v1.dot(v1);
        /** @type {?} */
        let dot12 = v1.dot(v2)
        // Compute barycentric coordinates
        ;
        // Compute barycentric coordinates
        /** @type {?} */
        let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        /** @type {?} */
        let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        /** @type {?} */
        let v = (dot00 * dot12 - dot01 * dot02) * invDenom
        // Check if point is in triangle
        ;
        // Check if point is in triangle
        return (u >= 0) && (v >= 0) && (u + v < 1);
    }
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
    if (false) {
        /** @type {?} */
        Vec2.prototype.x;
        /** @type {?} */
        Vec2.prototype.y;
        /* Skipping unhandled member: ;*/
    }
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
                for (let m = 0, v = nv - 1; nv > 2;) {
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
                        ++m;
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
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Polygon2D.Epsilon;
        /**
         * @type {?}
         * @private
         */
        Polygon2D.prototype.vertices;
    }
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
    if (false) {
        /** @type {?} */
        AABB2D.prototype.minX;
        /** @type {?} */
        AABB2D.prototype.maxX;
        /** @type {?} */
        AABB2D.prototype.minY;
        /** @type {?} */
        AABB2D.prototype.maxY;
    }
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
    if (false) {
        /** @type {?} */
        Spherical.prototype.r;
        /** @type {?} */
        Spherical.prototype.azimuth;
        /** @type {?} */
        Spherical.prototype.polar;
    }
})(psgeometry || (psgeometry = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHMtZ2VvbWV0cnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbW9kZWxzdGFnZS8iLCJzb3VyY2VzIjpbInNyYy9wcy1nZW9tZXRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBUSxVQUFVLENBdW5DdkI7QUF2bkNELFdBQWMsVUFBVTtJQUVwQixNQUFhLE9BQU87Ozs7UUErRHBCLFlBQVksUUFBbUI7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDOzs7Ozs7O1FBNURELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTOztnQkFDaEQsTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7Ozs7Ozs7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUzs7Z0JBQzVDLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZ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Q0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDek0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDek0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUFDLENBQ1osQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDOzs7Ozs7UUFNRCxDQUFDLENBQUMsTUFBYyxFQUFFLE1BQWM7O2dCQUMxQixHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxD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SSxDQUFDLFFBQVE7O29CQUNqQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVE7Z0JBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDekQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBRXpELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO29C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R0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FB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LEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0IsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDOzs7OztRQUVELFFBQVEsQ0FBQyxDQUFhOztnQkFDaEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDOztnQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7O2dCQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzs7Z0JBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDOztnQkFDOUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOztnQkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O2dCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Z0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QyxDQUFD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QXZuQ2EsVUFBVSxLQUFWLFVBQVUsUUF1bkN2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmV4cG9ydCBtb2R1bGUgcHNnZW9tZXRyeSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdHJpeDQge1xyXG4gICAgZWxlbWVudHM6IG51bWJlcltdO1xyXG5cclxuICAgIHN0YXRpYyBJZGVudGl0eSA9IG5ldyBNYXRyaXg0KCk7XHJcblxyXG4gICAgc3RhdGljIEZyb21UcmFuc2xhdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4NCgpO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbM10gPSB4O1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbN10gPSB5O1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbMTFdID0gejtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgRnJvbVNjYWxpbmcoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeDQoKTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzBdID0geDtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzVdID0geTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzEwXSA9IHo7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICBzdGF0aWMgRnJvbVJvdGF0aW9uWChhbmdsZTogbnVtYmVyKSB7XHJcbiAgICAgIGxldCBjb3NBID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICBsZXQgc2luQSA9IE1hdGguc2luKGFuZ2xlKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXg0KCk7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1s1XSA9IGNvc0E7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1s2XSA9IC1zaW5BO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbOV0gPSBzaW5BO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbMTBdID0gY29zQTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIEZyb21Sb3RhdGlvblkoYW5nbGU6IG51bWJlcikge1xyXG4gICAgICBsZXQgY29zQSA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgbGV0IHNpbkEgPSBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4NCgpO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbMF0gPSBjb3NBO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbMl0gPSBzaW5BO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbOF0gPSAtc2luQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzEwXSA9IGNvc0E7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBzdGF0aWMgRnJvbVJvdGF0aW9uWihhbmdsZTogbnVtYmVyKSB7XHJcbiAgICAgIGxldCBjb3NBID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICBsZXQgc2luQSA9IE1hdGguc2luKGFuZ2xlKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXg0KCk7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1swXSA9IGNvc0E7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1sxXSA9IC1zaW5BO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbNF0gPSBzaW5BO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbNV0gPSBjb3NBO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBGcm9tUm90YXRpb24ocGl0Y2g6IG51bWJlciwgeWF3OiBudW1iZXIsIHJvbGw6IG51bWJlcikge1xyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDQoW1xyXG4gICAgICAgIE1hdGguY29zKHlhdykgKiBNYXRoLmNvcyhwaXRjaCksIE1hdGguc2luKHlhdykgKiBNYXRoLmNvcyhwaXRjaCksIC1NYXRoLnNpbihwaXRjaCksIDAsXHJcbiAgICAgICAgTWF0aC5jb3MoeWF3KSAqIE1hdGguc2luKHBpdGNoKSAqIE1hdGguc2luKHJvbGwpIC0gTWF0aC5zaW4oeWF3KSAqIE1hdGguY29zKHJvbGwpLCBNYXRoLnNpbih5YXcpICogTWF0aC5zaW4ocGl0Y2gpICogTWF0aC5zaW4ocm9sbCkgKyBNYXRoLmNvcyh5YXcpICogTWF0aC5jb3Mocm9sbCksIE1hdGguY29zKHBpdGNoKSAqIE1hdGguc2luKHJvbGwpLCAwLFxyXG4gICAgICAgIE1hdGguY29zKHlhdykgKiBNYXRoLnNpbihwaXRjaCkgKiBNYXRoLmNvcyhyb2xsKSArIE1hdGguc2luKHlhdykgKiBNYXRoLnNpbihyb2xsKSwgTWF0aC5zaW4oeWF3KSAqIE1hdGguc2luKHBpdGNoKSAqIE1hdGguY29zKHJvbGwpIC0gTWF0aC5jb3MoeWF3KSAqIE1hdGguc2luKHJvbGwpLCBNYXRoLmNvcyhwaXRjaCkgKiBNYXRoLmNvcyhyb2xsKSwgMCxcclxuICAgICAgICAwLCAwLCAwLCAxXVxyXG4gICAgICApLnRyYW5zcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzPzogbnVtYmVyW10pIHtcclxuICAgICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzIHx8IFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH1cclxuXHJcbiAgICBlKGNvbElkeDogbnVtYmVyLCByb3dJZHg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgIGxldCBpZHggPSBjb2xJZHggKyAocm93SWR4IHx8IDApICogNDtcclxuICAgICAgcmV0dXJuIGlkeCA+PSAwICYmIGlkeCA8IDE2ID8gdGhpcy5lbGVtZW50c1tpZHhdIDogbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcm93KGlkeDogbnVtYmVyKTogVmVjNCB7XHJcbiAgICAgIGlmIChpZHggPj0gMCAmJiBpZHggPCA0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWM0KHRoaXMuZWxlbWVudHNbaWR4ICogNF0sIHRoaXMuZWxlbWVudHNbaWR4ICogNCArIDFdLCB0aGlzLmVsZW1lbnRzW2lkeCAqIDQgKyAyXSwgdGhpcy5lbGVtZW50c1tpZHggKiA0ICsgM10pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbChpZHg6IG51bWJlcik6IFZlYzQge1xyXG4gICAgICBpZiAoaWR4IDw9IDAgJiYgaWR4IDwgNCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLmVsZW1lbnRzW2lkeF0sIHRoaXMuZWxlbWVudHNbaWR4ICsgNF0sIHRoaXMuZWxlbWVudHNbaWR4ICsgOF0sIHRoaXMuZWxlbWVudHNbaWR4ICsgMTJdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVxdWFscyhtOiBNYXRyaXg0KSB7XHJcbiAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgbGV0IGwgPSB0aGlzLmVsZW1lbnRzO1xyXG4gICAgICAgIGxldCByID0gbS5lbGVtZW50cztcclxuXHJcbiAgICAgICAgcmV0dXJuIGxbMF0gPT0gclswXSAmJiBsWzFdID09IHJbMV0gJiYgbFsyXSA9PSByWzJdICYmIGxbM10gPT0gclszXSAmJlxyXG4gICAgICAgICAgbFs0XSA9PSByWzRdICYmIGxbNV0gPT0gcls1XSAmJiBsWzZdID09IHJbNl0gJiYgbFs3XSA9PSByWzddICYmXHJcbiAgICAgICAgICBsWzhdID09IHJbOF0gJiYgbFs5XSA9PSByWzldICYmIGxbMTBdID09IHJbMTBdICYmIGxbMTFdID09IHJbMTFdICYmXHJcbiAgICAgICAgICBsWzEyXSA9PSByWzEyXSAmJiBsWzEzXSA9PSByWzEzXSAmJiBsWzE0XSA9PSByWzE0XSAmJiBsWzE1XSA9PSByWzE1XTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkobTogTWF0cml4NCB8IFZlYzQgfCBudW1iZXIpOiBNYXRyaXg0IHwgVmVjNCB7XHJcbiAgICAgIGlmIChtIGluc3RhbmNlb2YgTWF0cml4NCkge1xyXG4gICAgICAgIGxldCBsID0gdGhpcy5lbGVtZW50cztcclxuICAgICAgICBsZXQgciA9IG0uZWxlbWVudHM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KFtcclxuICAgICAgICAgIGxbMF0gKiByWzBdICsgbFs0XSAqIHJbMV0gKyBsWzhdICogclsyXSArIGxbMTJdICogclszXSxcclxuICAgICAgICAgIGxbMV0gKiByWzBdICsgbFs1XSAqIHJbMV0gKyBsWzldICogclsyXSArIGxbMTNdICogclszXSxcclxuICAgICAgICAgIGxbMl0gKiByWzBdICsgbFs2XSAqIHJbMV0gKyBsWzEwXSAqIHJbMl0gKyBsWzE0XSAqIHJbM10sXHJcbiAgICAgICAgICBsWzNdICogclswXSArIGxbN10gKiByWzFdICsgbFsxMV0gKiByWzJdICsgbFsxNV0gKiByWzNdLFxyXG5cclxuICAgICAgICAgIGxbMF0gKiByWzRdICsgbFs0XSAqIHJbNV0gKyBsWzhdICogcls2XSArIGxbMTJdICogcls3XSxcclxuICAgICAgICAgIGxbMV0gKiByWzRdICsgbFs1XSAqIHJbNV0gKyBsWzldICogcls2XSArIGxbMTNdICogcls3XSxcclxuICAgICAgICAgIGxbMl0gKiByWzRdICsgbFs2XSAqIHJbNV0gKyBsWzEwXSAqIHJbNl0gKyBsWzE0XSAqIHJbN10sXHJcbiAgICAgICAgICBsWzNdICogcls0XSArIGxbN10gKiByWzVdICsgbFsxMV0gKiByWzZdICsgbFsxNV0gKiByWzddLFxyXG5cclxuICAgICAgICAgIGxbMF0gKiByWzhdICsgbFs0XSAqIHJbOV0gKyBsWzhdICogclsxMF0gKyBsWzEyXSAqIHJbMTFdLFxyXG4gICAgICAgICAgbFsxXSAqIHJbOF0gKyBsWzVdICogcls5XSArIGxbOV0gKiByWzEwXSArIGxbMTNdICogclsxMV0sXHJcbiAgICAgICAgICBsWzJdICogcls4XSArIGxbNl0gKiByWzldICsgbFsxMF0gKiByWzEwXSArIGxbMTRdICogclsxMV0sXHJcbiAgICAgICAgICBsWzNdICogcls4XSArIGxbN10gKiByWzldICsgbFsxMV0gKiByWzEwXSArIGxbMTVdICogclsxMV0sXHJcblxyXG4gICAgICAgICAgbFswXSAqIHJbMTJdICsgbFs0XSAqIHJbMTNdICsgbFs4XSAqIHJbMTRdICsgbFsxMl0gKiByWzE1XSxcclxuICAgICAgICAgIGxbMV0gKiByWzEyXSArIGxbNV0gKiByWzEzXSArIGxbOV0gKiByWzE0XSArIGxbMTNdICogclsxNV0sXHJcbiAgICAgICAgICBsWzJdICogclsxMl0gKyBsWzZdICogclsxM10gKyBsWzEwXSAqIHJbMTRdICsgbFsxNF0gKiByWzE1XSxcclxuICAgICAgICAgIGxbM10gKiByWzEyXSArIGxbN10gKiByWzEzXSArIGxbMTFdICogclsxNF0gKyBsWzE1XSAqIHJbMTVdXHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobSBpbnN0YW5jZW9mIFZlYzQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzQoXHJcbiAgICAgICAgICBtLnggKiB0aGlzLmVsZW1lbnRzWzBdICsgbS55ICogdGhpcy5lbGVtZW50c1sxXSArIG0ueiAqIHRoaXMuZWxlbWVudHNbMl0gKyBtLncgKiB0aGlzLmVsZW1lbnRzWzNdLFxyXG4gICAgICAgICAgbS54ICogdGhpcy5lbGVtZW50c1s0XSArIG0ueSAqIHRoaXMuZWxlbWVudHNbNV0gKyBtLnogKiB0aGlzLmVsZW1lbnRzWzZdICsgbS53ICogdGhpcy5lbGVtZW50c1s3XSxcclxuICAgICAgICAgIG0ueCAqIHRoaXMuZWxlbWVudHNbOF0gKyBtLnkgKiB0aGlzLmVsZW1lbnRzWzldICsgbS56ICogdGhpcy5lbGVtZW50c1sxMF0gKyBtLncgKiB0aGlzLmVsZW1lbnRzWzExXSxcclxuICAgICAgICAgIG0ueCAqIHRoaXMuZWxlbWVudHNbMTJdICsgbS55ICogdGhpcy5lbGVtZW50c1sxM10gKyBtLnogKiB0aGlzLmVsZW1lbnRzWzE0XSArIG0udyAqIHRoaXMuZWxlbWVudHNbMTVdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDQodGhpcy5lbGVtZW50cy5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgKiA8bnVtYmVyPm07IH0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvUmlnaHRUcmlhbmd1bGFyKCk6IE1hdHJpeDQge1xyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDQoTWF0cml4LnRvUmlnaHRUcmlhbmd1bGFyKHRoaXMuZWxlbWVudHMsIDQsIDQpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRlcm1pbmFudCgpOiBudW1iZXIge1xyXG4gICAgICBsZXQgbSA9IHRoaXMudG9SaWdodFRyaWFuZ3VsYXIoKTtcclxuICAgICAgcmV0dXJuIG0uZWxlbWVudHNbMF0gKiBtLmVsZW1lbnRzWzVdICogbS5lbGVtZW50c1sxMF0gKiBtLmVsZW1lbnRzWzE1XTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Npbmd1bGFyKCk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5kZXRlcm1pbmFudCgpID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zcG9zZSgpOiBNYXRyaXg0IHtcclxuICAgICAgbGV0IGUgPSB0aGlzLmVsZW1lbnRzO1xyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDQoW1xyXG4gICAgICAgIGVbMF0sIGVbNF0sIGVbOF0sIGVbMTJdLFxyXG4gICAgICAgIGVbMV0sIGVbNV0sIGVbOV0sIGVbMTNdLFxyXG4gICAgICAgIGVbMl0sIGVbNl0sIGVbMTBdLCBlWzE0XSxcclxuICAgICAgICBlWzNdLCBlWzddLCBlWzExXSwgZVsxNV1cclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW52ZXJzZSgpOiBNYXRyaXg0IHtcclxuICAgICAgaWYgKCF0aGlzLmlzU2luZ3VsYXIoKSkge1xyXG4gICAgICAgIGxldCBhdWdtZW50ZWRNYXRyaXggPSBbXHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzWzBdLCB0aGlzLmVsZW1lbnRzWzFdLCB0aGlzLmVsZW1lbnRzWzJdLCB0aGlzLmVsZW1lbnRzWzNdLCAxLCAwLCAwLCAwLFxyXG4gICAgICAgICAgdGhpcy5lbGVtZW50c1s0XSwgdGhpcy5lbGVtZW50c1s1XSwgdGhpcy5lbGVtZW50c1s2XSwgdGhpcy5lbGVtZW50c1s3XSwgMCwgMSwgMCwgMCxcclxuICAgICAgICAgIHRoaXMuZWxlbWVudHNbOF0sIHRoaXMuZWxlbWVudHNbOV0sIHRoaXMuZWxlbWVudHNbMTBdLCB0aGlzLmVsZW1lbnRzWzExXSwgMCwgMCwgMSwgMCxcclxuICAgICAgICAgIHRoaXMuZWxlbWVudHNbMTJdLCB0aGlzLmVsZW1lbnRzWzEzXSwgdGhpcy5lbGVtZW50c1sxNF0sIHRoaXMuZWxlbWVudHNbMTVdLCAwLCAwLCAwLCAxXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgbGV0IG0gPSBNYXRyaXgudG9SaWdodFRyaWFuZ3VsYXIoYXVnbWVudGVkTWF0cml4LCA0LCA4KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMzsgcm93ID49IDA7IHJvdy0tKSB7XHJcbiAgICAgICAgICBsZXQgZGl2aXNvciA9IG1bcm93ICogOV07XHJcbiAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA4OyBjb2wrKykge1xyXG4gICAgICAgICAgICBtW3JvdyAqIDggKyBjb2xdID0gbVtyb3cgKiA4ICsgY29sXSAvIGRpdmlzb3I7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgYWx0cm93ID0gcm93IC0gMTsgYWx0cm93ID49IDA7IGFsdHJvdy0tKSB7XHJcbiAgICAgICAgICAgIGxldCBtdWx0aXBsaWVyID0gbVthbHRyb3cgKiA4ICsgcm93XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgODsgY29sKyspIHtcclxuICAgICAgICAgICAgICBtW2FsdHJvdyAqIDggKyBjb2xdID0gbVthbHRyb3cgKiA4ICsgY29sXSAtIG1bcm93ICogOCArIGNvbF0gKiBtdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NChbXHJcbiAgICAgICAgICBtWzRdLCBtWzVdLCBtWzZdLCBtWzddLFxyXG4gICAgICAgICAgbVsxMl0sIG1bMTNdLCBtWzE0XSwgbVsxNV0sXHJcbiAgICAgICAgICBtWzIwXSwgbVsyMV0sIG1bMjJdLCBtWzIzXSxcclxuICAgICAgICAgIG1bMjhdLCBtWzI5XSwgbVszMF0sIG1bMzFdXHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBleHBvcnQgY2xhc3MgTWF0cml4MyB7XHJcbiAgICBlbGVtZW50czogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudHM/OiBudW1iZXJbXSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHMgfHwgWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBJZGVudGl0eSA9IG5ldyBNYXRyaXgzKCk7XHJcblxyXG4gICAgZShjb2xJZHg6IG51bWJlciwgcm93SWR4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICBsZXQgaWR4ID0gY29sSWR4ICsgKHJvd0lkeCB8fCAwKSAqIDM7XHJcbiAgICAgIHJldHVybiBpZHggPj0gMCAmJiBpZHggPCA5ID8gdGhpcy5lbGVtZW50c1tpZHhdIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByb3coaWR4OiBudW1iZXIpOiBWZWMzIHtcclxuICAgICAgaWYgKGlkeCA+PSAwICYmIGlkeCA8IDMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzModGhpcy5lbGVtZW50c1tpZHggKiAzXSwgdGhpcy5lbGVtZW50c1tpZHggKiAzICsgMV0sIHRoaXMuZWxlbWVudHNbaWR4ICogMyArIDJdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbChpZHg6IG51bWJlcik6IFZlYzMge1xyXG4gICAgICBpZiAoaWR4IDw9IDAgJiYgaWR4IDwgMykge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLmVsZW1lbnRzW2lkeF0sIHRoaXMuZWxlbWVudHNbaWR4ICsgM10sIHRoaXMuZWxlbWVudHNbaWR4ICsgNl0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkobTogTWF0cml4MyB8IFZlYzMgfCBudW1iZXIpOiBNYXRyaXgzIHwgVmVjMyB7XHJcbiAgICAgIGlmIChtIGluc3RhbmNlb2YgTWF0cml4Mykge1xyXG4gICAgICAgIGxldCBsID0gdGhpcy5lbGVtZW50cztcclxuICAgICAgICBsZXQgciA9IG0uZWxlbWVudHM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgzKFtcclxuICAgICAgICAgIGxbMF0gKiByWzBdICsgbFszXSAqIHJbMV0gKyBsWzZdICogclsyXSxcclxuICAgICAgICAgIGxbMV0gKiByWzBdICsgbFs0XSAqIHJbMV0gKyBsWzddICogclsyXSxcclxuICAgICAgICAgIGxbMl0gKiByWzBdICsgbFs1XSAqIHJbMV0gKyBsWzhdICogclsyXSxcclxuXHJcbiAgICAgICAgICBsWzBdICogclszXSArIGxbM10gKiByWzRdICsgbFs2XSAqIHJbNV0sXHJcbiAgICAgICAgICBsWzFdICogclszXSArIGxbNF0gKiByWzRdICsgbFs3XSAqIHJbNV0sXHJcbiAgICAgICAgICBsWzJdICogclszXSArIGxbNV0gKiByWzRdICsgbFs4XSAqIHJbNV0sXHJcblxyXG4gICAgICAgICAgbFswXSAqIHJbNl0gKyBsWzNdICogcls3XSArIGxbNl0gKiByWzhdLFxyXG4gICAgICAgICAgbFsxXSAqIHJbNl0gKyBsWzRdICogcls3XSArIGxbN10gKiByWzhdLFxyXG4gICAgICAgICAgbFsyXSAqIHJbNl0gKyBsWzVdICogcls3XSArIGxbOF0gKiByWzhdXHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobSBpbnN0YW5jZW9mIFZlYzMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgICAgICBtLnggKiB0aGlzLmVsZW1lbnRzWzBdICsgbS55ICogdGhpcy5lbGVtZW50c1sxXSArIG0ueiAqIHRoaXMuZWxlbWVudHNbMl0sXHJcbiAgICAgICAgICBtLnggKiB0aGlzLmVsZW1lbnRzWzNdICsgbS55ICogdGhpcy5lbGVtZW50c1s0XSArIG0ueiAqIHRoaXMuZWxlbWVudHNbNV0sXHJcbiAgICAgICAgICBtLnggKiB0aGlzLmVsZW1lbnRzWzZdICsgbS55ICogdGhpcy5lbGVtZW50c1s3XSArIG0ueiAqIHRoaXMuZWxlbWVudHNbOF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4Myh0aGlzLmVsZW1lbnRzLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSAqIDxudW1iZXI+bTsgfSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9SaWdodFRyaWFuZ3VsYXIoKTogTWF0cml4MyB7XHJcbiAgICAgIHJldHVybiBuZXcgTWF0cml4MyhNYXRyaXgudG9SaWdodFRyaWFuZ3VsYXIodGhpcy5lbGVtZW50cywgMywgMykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRldGVybWluYW50KCk6IG51bWJlciB7XHJcbiAgICAgIGxldCBtID0gdGhpcy50b1JpZ2h0VHJpYW5ndWxhcigpO1xyXG4gICAgICByZXR1cm4gbS5lbGVtZW50c1swXSAqIG0uZWxlbWVudHNbNF0gKiBtLmVsZW1lbnRzWzhdO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU2luZ3VsYXIoKTogYm9vbGVhbiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRldGVybWluYW50KCkgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNwb3NlKCk6IE1hdHJpeDMge1xyXG4gICAgICBsZXQgZSA9IHRoaXMuZWxlbWVudHM7XHJcbiAgICAgIHJldHVybiBuZXcgTWF0cml4MyhbXHJcbiAgICAgICAgZVswXSwgZVszXSwgZVs2XSxcclxuICAgICAgICBlWzFdLCBlWzRdLCBlWzddLFxyXG4gICAgICAgIGVbMl0sIGVbNV0sIGVbOF1cclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW52ZXJzZSgpOiBNYXRyaXgzIHtcclxuICAgICAgaWYgKCF0aGlzLmlzU2luZ3VsYXIoKSkge1xyXG4gICAgICAgIGxldCBhdWdtZW50ZWRNYXRyaXggPSBbXHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzWzBdLCB0aGlzLmVsZW1lbnRzWzFdLCB0aGlzLmVsZW1lbnRzWzJdLCAxLCAwLCAwLFxyXG4gICAgICAgICAgdGhpcy5lbGVtZW50c1szXSwgdGhpcy5lbGVtZW50c1s0XSwgdGhpcy5lbGVtZW50c1s1XSwgMCwgMSwgMCxcclxuICAgICAgICAgIHRoaXMuZWxlbWVudHNbNl0sIHRoaXMuZWxlbWVudHNbN10sIHRoaXMuZWxlbWVudHNbOF0sIDAsIDAsIDEsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgbGV0IG0gPSBNYXRyaXgudG9SaWdodFRyaWFuZ3VsYXIoYXVnbWVudGVkTWF0cml4LCAzLCA2KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMjsgcm93ID49IDA7IHJvdy0tKSB7XHJcbiAgICAgICAgICBsZXQgZGl2aXNvciA9IG1bcm93ICogN107XHJcbiAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA2OyBjb2wrKykge1xyXG4gICAgICAgICAgICBtW3JvdyAqIDcgKyBjb2xdID0gbVtyb3cgKiA3ICsgY29sXSAvIGRpdmlzb3I7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgYWx0cm93ID0gcm93IC0gMTsgYWx0cm93ID49IDA7IGFsdHJvdy0tKSB7XHJcbiAgICAgICAgICAgIGxldCBtdWx0aXBsaWVyID0gbVthbHRyb3cgKiA2ICsgcm93XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNjsgY29sKyspIHtcclxuICAgICAgICAgICAgICBtW2FsdHJvdyAqIDYgKyBjb2xdID0gbVthbHRyb3cgKiA2ICsgY29sXSAtIG1bcm93ICogNiArIGNvbF0gKiBtdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4MyhbXHJcbiAgICAgICAgICBtWzNdLCBtWzRdLCBtWzVdLFxyXG4gICAgICAgICAgbVs5XSwgbVsxMF0sIG1bMTFdLFxyXG4gICAgICAgICAgbVsxNV0sIG1bMTZdLCBtWzE3XVxyXG4gICAgICAgIF0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgTWF0cml4IHtcclxuICAgIHN0YXRpYyB0b1JpZ2h0VHJpYW5ndWxhcihlbGVtZW50cywgcm93cywgY29scykge1xyXG4gICAgICBsZXQgbSA9IGVsZW1lbnRzLnNsaWNlKDApO1xyXG5cclxuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcclxuICAgICAgICBpZiAobVtyb3cgKiAoY29scyArIDEpXSA9PSAwKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBhbHRyb3cgPSByb3cgKyAxOyBhbHRyb3cgPCByb3dzOyBhbHRyb3crKykge1xyXG4gICAgICAgICAgICBpZiAobVthbHRyb3cgKiBjb2xzICsgcm93XSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG1bcm93ICogY29scyArIGpdICs9IG1bYWx0cm93ICogY29scyArIGpdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1bcm93ICogKGNvbHMgKyAxKV0gIT0gMCkge1xyXG4gICAgICAgICAgZm9yIChsZXQgYWx0cm93ID0gcm93ICsgMTsgYWx0cm93IDwgcm93czsgYWx0cm93KyspIHtcclxuICAgICAgICAgICAgbGV0IG11bHRpcGxpZXIgPSBtW2FsdHJvdyAqIGNvbHMgKyByb3ddIC8gbVtyb3cgKiAoY29scyArIDEpXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcclxuICAgICAgICAgICAgICBtW2FsdHJvdyAqIGNvbHMgKyBqXSA9IGogPCByb3cgPyAwIDogbVthbHRyb3cgKiBjb2xzICsgal0gLSBtW3JvdyAqIGNvbHMgKyBqXSAqIG11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgVmVjMyB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB6OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD8sIHk/LCB6Pykge1xyXG4gICAgICB0aGlzLnggPSB4IHx8IDAuMDtcclxuICAgICAgdGhpcy55ID0geSB8fCAwLjA7XHJcbiAgICAgIHRoaXMueiA9IHogfHwgMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjMygpIHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYXNWZWM0KHc/OiBudW1iZXIpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWM0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHcgfHwgMS4wKTtcclxuICAgIH1cclxuXHJcbiAgICBlcXVhbHModjogVmVjMyk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gdGhpcy54ID09IHYueCAmJiB0aGlzLnkgPT0gdi55ICYmIHRoaXMueiA9PSB2Lno7XHJcbiAgICB9XHJcblxyXG4gICAgYXNzaWduUG9pbnQoeCwgeSwgeikge1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICB0aGlzLnogPSB6O1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnblZlYyh2OiBWZWMzIHwgVmVjNCkge1xyXG4gICAgICB0aGlzLnggPSB2Lng7XHJcbiAgICAgIHRoaXMueSA9IHYueTtcclxuICAgICAgdGhpcy56ID0gdi56O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZCh2ZWM6IFZlYzMgfCBWZWM0KTogVmVjMyB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLnggKyB2ZWMueCwgdGhpcy55ICsgdmVjLnksIHRoaXMueiArIHZlYy56KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWIodmVjOiBWZWMzIHwgVmVjNCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzModGhpcy54IC0gdmVjLngsIHRoaXMueSAtIHZlYy55LCB0aGlzLnogLSB2ZWMueik7XHJcbiAgICB9XHJcblxyXG4gICAgZG90KHZlYzogVmVjMyB8IFZlYzQpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy54ICogdmVjLnggKyB0aGlzLnkgKiB2ZWMueSArIHRoaXMueiAqIHZlYy56O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKHY6IFZlYzMgfCBWZWM0KSB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjMyhcclxuICAgICAgICAodGhpcy55ICogdi56KSAtICh0aGlzLnogKiB2LnkpLFxyXG4gICAgICAgICh0aGlzLnogKiB2LngpIC0gKHRoaXMueCAqIHYueiksXHJcbiAgICAgICAgKHRoaXMueCAqIHYueSkgLSAodGhpcy55ICogdi54KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KHM6IG51bWJlcikge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzModGhpcy54ICogcywgdGhpcy55ICogcywgdGhpcy56ICogcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlRdWF0ZXJuaW9uKHE6IFF1YXRlcm5pb24pIHtcclxuICAgICAgbGV0IHggPSB0aGlzLng7XHJcbiAgICAgIGxldCB5ID0gdGhpcy55O1xyXG4gICAgICBsZXQgeiA9IHRoaXMuejtcclxuXHJcbiAgICAgIGxldCBxeCA9IHEueDtcclxuICAgICAgbGV0IHF5ID0gcS55O1xyXG4gICAgICBsZXQgcXogPSBxLno7XHJcbiAgICAgIGxldCBxdyA9IHEudztcclxuXHJcbiAgICAgIC8vIHF1YXRlcm5pb24gKiB2ZWN0b3JcclxuICAgICAgbGV0IHB4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5O1xyXG4gICAgICBsZXQgcHkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XHJcbiAgICAgIGxldCBweiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcclxuICAgICAgbGV0IHB3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcclxuXHJcbiAgICAgIC8vIHByb2R1Y3QgKiBpbnZlcnNlIHF1YXRlcm5pb25cclxuICAgICAgdGhpcy54ID0gcHggKiBxdyAtIHB3ICogcXggLSBweSAqIHF6ICsgcHogKiBxeTtcclxuICAgICAgdGhpcy55ID0gcHkgKiBxdyAtIHB3ICogcXkgLSBweiAqIHF4ICsgcHggKiBxejtcclxuICAgICAgdGhpcy56ID0gcHogKiBxdyAtIHB3ICogcXogLSBweCAqIHF5ICsgcHkgKiBxeDtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm0oKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56KTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxpemUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGx5KDEgLyB0aGlzLm5vcm0oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudHMoKSB7XHJcbiAgICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnksIHRoaXMuel07XHJcbiAgICB9XHJcblxyXG4gICAgc3F1YXJlZERpc3QodjogVmVjMyB8IFZlYzQpIHtcclxuICAgICAgcmV0dXJuICh0aGlzLnggLSB2LngpICogKHRoaXMueCAtIHYueCkgK1xyXG4gICAgICAgICh0aGlzLnkgLSB2LnkpICogKHRoaXMueSAtIHYueSkgK1xyXG4gICAgICAgICh0aGlzLnogLSB2LnopICogKHRoaXMueiAtIHYueik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgVmVjNCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB6OiBudW1iZXI7XHJcbiAgICB3OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBaZXJvID0gbmV3IFZlYzQoMC4wLCAwLjAsIDAuMCwgMC4wKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE9uZSA9IG5ldyBWZWM0KDEuMCwgMS4wLCAxLjAsIDEuMCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD8sIHk/LCB6Pywgdz8pIHtcclxuICAgICAgdGhpcy54ID0geCB8fCAwLjA7XHJcbiAgICAgIHRoaXMueSA9IHkgfHwgMC4wO1xyXG4gICAgICB0aGlzLnogPSB6IHx8IDAuMDtcclxuICAgICAgdGhpcy53ID0gdyB8fCAwLjA7XHJcbiAgICB9XHJcblxyXG4gICAgZXF1YWxzKHY6IFZlYzQpOiBib29sZWFuIHtcclxuICAgICAgcmV0dXJuIHRoaXMueCA9PSB2LnggJiYgdGhpcy55ID09IHYueSAmJiB0aGlzLnogPT0gdi56ICYmIHRoaXMudyA9PSB2Lnc7XHJcbiAgICB9XHJcblxyXG4gICAgYXNWZWMzKCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzModGhpcy54LCB0aGlzLnksIHRoaXMueik7XHJcbiAgICB9XHJcblxyXG4gICAgYXNWZWM0KCk6IFZlYzQge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhZGQodmVjOiBWZWM0KTogVmVjNCB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLnggKyB2ZWMueCwgdGhpcy55ICsgdmVjLnksIHRoaXMueiArIHZlYy56LCB0aGlzLncgKyB2ZWMudyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViKHZlYzogVmVjNCk6IFZlYzQge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzQodGhpcy54IC0gdmVjLngsIHRoaXMueSAtIHZlYy55LCB0aGlzLnogLSB2ZWMueiwgdGhpcy53IC0gdmVjLncpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdCh2ZWM6IFZlYzQpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy54ICogdmVjLnggKyB0aGlzLnkgKiB2ZWMueSArIHRoaXMueiAqIHZlYy56ICsgdGhpcy53ICogdmVjLnc7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3ModjogVmVjNCk6IFZlYzQge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzQoXHJcbiAgICAgICAgKHRoaXMueSAqIHYueikgLSAodGhpcy56ICogdi55KSxcclxuICAgICAgICAodGhpcy56ICogdi54KSAtICh0aGlzLnggKiB2LnopLFxyXG4gICAgICAgICh0aGlzLnggKiB2LnkpIC0gKHRoaXMueSAqIHYueCksXHJcbiAgICAgICAgMS4wXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsdGlwbHkoczogbnVtYmVyKTogVmVjNCB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLnggKiBzLCB0aGlzLnkgKiBzLCB0aGlzLnogKiBzLCB0aGlzLncgKiBzKTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtKCk6IG51bWJlciB7XHJcbiAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICsgdGhpcy53ICogdGhpcy53KTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxpemUoKTogVmVjNCB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGx5KDEgLyB0aGlzLm5vcm0oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudHMoKTogbnVtYmVyW10ge1xyXG4gICAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMud107XHJcbiAgICB9XHJcblxyXG4gICAgc3F1YXJlZERpc3QodjogVmVjNCkge1xyXG4gICAgICByZXR1cm4gKHRoaXMueCAtIHYueCkgKiAodGhpcy54IC0gdi54KSArXHJcbiAgICAgICAgKHRoaXMueSAtIHYueSkgKiAodGhpcy55IC0gdi55KSArXHJcbiAgICAgICAgKHRoaXMueiAtIHYueikgKiAodGhpcy56IC0gdi56KSArXHJcbiAgICAgICAgKHRoaXMudyAtIHYudykgKiAodGhpcy53IC0gdi53KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBRdWF0ZXJuaW9uIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHo6IG51bWJlcjtcclxuICAgIHc6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCB3PzogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMueCA9IHggfHwgMC4wO1xyXG4gICAgICB0aGlzLnkgPSB5IHx8IDAuMDtcclxuICAgICAgdGhpcy56ID0geiB8fCAwLjA7XHJcbiAgICAgIHRoaXMudyA9IHR5cGVvZiB3ID09ICd1bmRlZmluZWQnID8gMS4wIDogdztcclxuICAgIH1cclxuXHJcbiAgICBzZXRGcm9tQXhpc0FuZ2xlKGF4aXM6IFZlYzMsIGFuZ2xlOiBudW1iZXIpOiBRdWF0ZXJuaW9uIHtcclxuICAgICAgbGV0IGhhbGZBbmdsZSA9IGFuZ2xlIC8gMjtcclxuICAgICAgbGV0IHMgPSBNYXRoLnNpbihoYWxmQW5nbGUpO1xyXG5cclxuICAgICAgdGhpcy54ID0gYXhpcy54ICogcztcclxuICAgICAgdGhpcy55ID0gYXhpcy55ICogcztcclxuICAgICAgdGhpcy56ID0gYXhpcy56ICogcztcclxuICAgICAgdGhpcy53ID0gTWF0aC5jb3MoaGFsZkFuZ2xlKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KHE6IFF1YXRlcm5pb24pIHtcclxuICAgICAgbGV0IHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLnosIHcgPSB0aGlzLnc7XHJcbiAgICAgIGxldCBxeCA9IHEueCwgcXkgPSBxLnksIHF6ID0gcS56LCBxdyA9IHEudztcclxuXHJcbiAgICAgIHRoaXMueCA9IHggKiBxdyArIHcgKiBxeCArIHkgKiBxeiAtIHogKiBxeTtcclxuICAgICAgdGhpcy55ID0geSAqIHF3ICsgdyAqIHF5ICsgeiAqIHF4IC0geCAqIHF6O1xyXG4gICAgICB0aGlzLnogPSB6ICogcXcgKyB3ICogcXogKyB4ICogcXkgLSB5ICogcXg7XHJcbiAgICAgIHRoaXMudyA9IHcgKiBxdyAtIHggKiBxeCAtIHkgKiBxeSAtIHogKiBxejtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBBQUJCM0Qge1xyXG4gICAgcHVibGljIG1pblg6IG51bWJlciA9ICtJbmZpbml0eTtcclxuICAgIHB1YmxpYyBtYXhYOiBudW1iZXIgPSAtSW5maW5pdHk7XHJcbiAgICBwdWJsaWMgbWluWTogbnVtYmVyID0gK0luZmluaXR5O1xyXG4gICAgcHVibGljIG1heFk6IG51bWJlciA9IC1JbmZpbml0eTtcclxuICAgIHB1YmxpYyBtaW5aOiBudW1iZXIgPSArSW5maW5pdHk7XHJcbiAgICBwdWJsaWMgbWF4WjogbnVtYmVyID0gLUluZmluaXR5O1xyXG5cclxuICAgIHB1YmxpYyBhZGRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMubWluWCA9IE1hdGgubWluKHRoaXMubWluWCwgeCk7XHJcbiAgICAgIHRoaXMubWF4WCA9IE1hdGgubWF4KHRoaXMubWF4WCwgeCk7XHJcbiAgICAgIHRoaXMubWluWSA9IE1hdGgubWluKHRoaXMubWluWSwgeSk7XHJcbiAgICAgIHRoaXMubWF4WSA9IE1hdGgubWF4KHRoaXMubWF4WSwgeSk7XHJcbiAgICAgIHRoaXMubWluWiA9IE1hdGgubWluKHRoaXMubWluWiwgeik7XHJcbiAgICAgIHRoaXMubWF4WiA9IE1hdGgubWF4KHRoaXMubWF4Wiwgeik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFZlY3Rvcih2OiBWZWMzIHwgVmVjNCkge1xyXG4gICAgICB0aGlzLmFkZFBvaW50KHYueCwgdi55LCB2LnopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRBQUJCKGJveDogQUFCQjNEKSB7XHJcbiAgICAgIHRoaXMuYWRkUG9pbnQoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWik7XHJcbiAgICAgIHRoaXMuYWRkUG9pbnQoYm94Lm1heFgsIGJveC5tYXhZLCBib3gubWF4Wik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLm1pblggPSArSW5maW5pdHk7XHJcbiAgICAgIHRoaXMubWF4WCA9IC1JbmZpbml0eTtcclxuICAgICAgdGhpcy5taW5ZID0gK0luZmluaXR5O1xyXG4gICAgICB0aGlzLm1heFkgPSAtSW5maW5pdHk7XHJcbiAgICAgIHRoaXMubWluWiA9ICtJbmZpbml0eTtcclxuICAgICAgdGhpcy5tYXhaID0gLUluZmluaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjZW50ZXIoKTogVmVjMyB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjMyhcclxuICAgICAgICAuNSAqICh0aGlzLm1pblggKyB0aGlzLm1heFgpLFxyXG4gICAgICAgIC41ICogKHRoaXMubWluWSArIHRoaXMubWF4WSksXHJcbiAgICAgICAgLjUgKiAodGhpcy5taW5aICsgdGhpcy5tYXhaKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHRlbnRzKCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgICAgKHRoaXMubWF4WCAtIHRoaXMubWluWCksXHJcbiAgICAgICAgKHRoaXMubWF4WSAtIHRoaXMubWluWSksXHJcbiAgICAgICAgKHRoaXMubWF4WiAtIHRoaXMubWluWilcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWluKCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgICAgdGhpcy5taW5YLFxyXG4gICAgICAgIHRoaXMubWluWSxcclxuICAgICAgICB0aGlzLm1pblpcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWF4KCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgICAgdGhpcy5tYXhYLFxyXG4gICAgICAgIHRoaXMubWF4WSxcclxuICAgICAgICB0aGlzLm1heFpcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29udGFpbnModjogVmVjMyB8IFZlYzQpIHtcclxuICAgICAgcmV0dXJuIHYueCA+PSB0aGlzLm1pblggJiYgdi54IDw9IHRoaXMubWF4WCAmJlxyXG4gICAgICAgIHYueSA+PSB0aGlzLm1pblkgJiYgdi55IDw9IHRoaXMubWF4WSAmJlxyXG4gICAgICAgIHYueiA+PSB0aGlzLm1pblogJiYgdi56IDw9IHRoaXMubWF4WjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtKG1hdHJpeDogTWF0cml4NCk6IEFBQkIzRCB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBuZXcgQUFCQjNEKCk7XHJcblxyXG4gICAgICBsZXQgbWluViA9IDxWZWM0Pm1hdHJpeC5tdWx0aXBseShuZXcgVmVjNCh0aGlzLm1pblgsIHRoaXMubWluWSwgdGhpcy5taW5aLCAxKSk7XHJcbiAgICAgIGxldCBtYXhWID0gPFZlYzQ+bWF0cml4Lm11bHRpcGx5KG5ldyBWZWM0KHRoaXMubWF4WCwgdGhpcy5tYXhZLCB0aGlzLm1heFosIDEpKTtcclxuXHJcbiAgICAgIHJlc3VsdC5taW5YID0gbWluVi54OyByZXN1bHQubWluWSA9IG1pblYueTsgcmVzdWx0Lm1pblogPSBtaW5WLno7XHJcbiAgICAgIHJlc3VsdC5tYXhYID0gbWF4Vi54OyByZXN1bHQubWF4WSA9IG1heFYueTsgcmVzdWx0Lm1heFogPSBtYXhWLno7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcnNlY3RzUmF5KHJheTogTGluZTNEKTogVmVjMyB7XHJcbiAgICAgIGxldCByZXN1bHQ6IFZlYzMgPSBudWxsO1xyXG5cclxuICAgICAgbGV0IHYwID0gcmF5LnAwLmFzVmVjMygpO1xyXG4gICAgICBsZXQgZGlyID0gcmF5LnAxLmFzVmVjMygpLnN1YihyYXkucDAuYXNWZWMzKCkpO1xyXG5cclxuICAgICAgbGV0IGludFgwID0gcmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgVmVjMyh0aGlzLm1pblgsIDAsIDApLCBuZXcgVmVjMygtMSwgMCwgMCkpO1xyXG4gICAgICBsZXQgaW50WDEgPSByYXkuaW50ZXJzZWN0UmF5V2l0aFBsYW5lKG5ldyBWZWMzKHRoaXMubWF4WCwgMCwgMCksIG5ldyBWZWMzKDEsIDAsIDApKTtcclxuICAgICAgbGV0IGludFkwID0gcmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgVmVjMygwLCB0aGlzLm1pblksIDApLCBuZXcgVmVjMygwLCAtMSwgMCkpO1xyXG4gICAgICBsZXQgaW50WTEgPSByYXkuaW50ZXJzZWN0UmF5V2l0aFBsYW5lKG5ldyBWZWMzKDAsIHRoaXMubWF4WSwgMCksIG5ldyBWZWMzKDAsIDEsIDApKTtcclxuICAgICAgbGV0IGludFowID0gcmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgVmVjMygwLCAwLCB0aGlzLm1pblopLCBuZXcgVmVjMygwLCAwLCAtMSkpO1xyXG4gICAgICBsZXQgaW50WjEgPSByYXkuaW50ZXJzZWN0UmF5V2l0aFBsYW5lKG5ldyBWZWMzKDAsIDAsIHRoaXMubWF4WiksIG5ldyBWZWMzKDAsIDAsIDEpKTtcclxuXHJcbiAgICAgIGxldCBjdXJyRGlzdCA9IEluZmluaXR5O1xyXG4gICAgICBpZiAoaW50WDAgJiYgdGhpcy5jb250YWlucyhpbnRYMCkpIHsgY3VyckRpc3QgPSB2MC5zcXVhcmVkRGlzdChpbnRYMCk7IHJlc3VsdCA9IGludFgwOyB9XHJcbiAgICAgIGlmIChpbnRYMSAmJiB0aGlzLmNvbnRhaW5zKGludFgxKSAmJiB2MC5zcXVhcmVkRGlzdChpbnRYMSkgPCBjdXJyRGlzdCkgeyBjdXJyRGlzdCA9IHYwLnNxdWFyZWREaXN0KGludFgxKTsgcmVzdWx0ID0gaW50WDE7IH1cclxuICAgICAgaWYgKGludFkwICYmIHRoaXMuY29udGFpbnMoaW50WTApICYmIHYwLnNxdWFyZWREaXN0KGludFkwKSA8IGN1cnJEaXN0KSB7IGN1cnJEaXN0ID0gdjAuc3F1YXJlZERpc3QoaW50WTApOyByZXN1bHQgPSBpbnRZMDsgfVxyXG4gICAgICBpZiAoaW50WTEgJiYgdGhpcy5jb250YWlucyhpbnRZMSkgJiYgdjAuc3F1YXJlZERpc3QoaW50WTEpIDwgY3VyckRpc3QpIHsgY3VyckRpc3QgPSB2MC5zcXVhcmVkRGlzdChpbnRZMSk7IHJlc3VsdCA9IGludFkxOyB9XHJcbiAgICAgIGlmIChpbnRaMCAmJiB0aGlzLmNvbnRhaW5zKGludFowKSAmJiB2MC5zcXVhcmVkRGlzdChpbnRaMCkgPCBjdXJyRGlzdCkgeyBjdXJyRGlzdCA9IHYwLnNxdWFyZWREaXN0KGludFowKTsgcmVzdWx0ID0gaW50WjA7IH1cclxuICAgICAgaWYgKGludFoxICYmIHRoaXMuY29udGFpbnMoaW50WjEpICYmIHYwLnNxdWFyZWREaXN0KGludFoxKSA8IGN1cnJEaXN0KSB7IGN1cnJEaXN0ID0gdjAuc3F1YXJlZERpc3QoaW50WjEpOyByZXN1bHQgPSBpbnRaMTsgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBQb2ludDNEIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHo6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PywgeT8sIHo/KSB7XHJcbiAgICAgIHRoaXMueCA9IHggfHwgMC4wO1xyXG4gICAgICB0aGlzLnkgPSB5IHx8IDAuMDtcclxuICAgICAgdGhpcy56ID0geiB8fCAwLjA7XHJcbiAgICB9XHJcblxyXG4gICAgYXNWZWMzKCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzModGhpcy54LCB0aGlzLnksIHRoaXMueik7XHJcbiAgICB9XHJcblxyXG4gICAgYXNWZWM0KHc/OiBudW1iZXIpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWM0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHcgfHwgMS4wKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBMaW5lM0Qge1xyXG4gICAgcDA6IFBvaW50M0Q7XHJcbiAgICBwMTogUG9pbnQzRDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwMCwgcDEpIHtcclxuICAgICAgdGhpcy5wMCA9IHAwIHx8IG5ldyBQb2ludDNEKCk7XHJcbiAgICAgIHRoaXMucDEgPSBwMSB8fCBuZXcgUG9pbnQzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcnNlY3RSYXlXaXRoUGxhbmUodjA6IFZlYzMsIG46IFZlYzMpOiBWZWMzIHtcclxuICAgICAgbGV0IHJlc3VsdDogVmVjMyA9IG51bGw7XHJcblxyXG4gICAgICBsZXQgdSA9IHRoaXMucDEuYXNWZWMzKCkuc3ViKHRoaXMucDAuYXNWZWMzKCkpO1xyXG5cclxuICAgICAgbGV0IEQgPSBuLmRvdCh1KTtcclxuICAgICAgaWYgKEQgIT0gMCkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy5wMC5hc1ZlYzMoKS5zdWIodjApO1xyXG4gICAgICAgIGxldCBOID0gLW4uZG90KHcpO1xyXG4gICAgICAgIGxldCBzSSA9IE4gLyBEO1xyXG5cclxuICAgICAgICBpZiAoc0kgPj0gMCkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5wMC5hc1ZlYzMoKS5hZGQodS5tdWx0aXBseShzSSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcnNlY3RUcmlhbmdsZShwMCwgcDEsIHAyKSB7XHJcbiAgICAgIGxldCBtYXRyaXggPSBuZXcgTWF0cml4MyhbXHJcbiAgICAgICAgdGhpcy5wMC54IC0gdGhpcy5wMS54LCBwMS54IC0gcDAueCwgcDIueCAtIHAwLngsXHJcbiAgICAgICAgdGhpcy5wMC55IC0gdGhpcy5wMS55LCBwMS55IC0gcDAueSwgcDIueSAtIHAwLnksXHJcbiAgICAgICAgdGhpcy5wMC56IC0gdGhpcy5wMS56LCBwMS56IC0gcDAueiwgcDIueiAtIHAwLnpcclxuICAgICAgXSkuaW52ZXJzZSgpO1xyXG5cclxuICAgICAgaWYgKG1hdHJpeCkge1xyXG4gICAgICAgIGxldCByZXMgPSBtYXRyaXgubXVsdGlwbHkodGhpcy5wMC5hc1ZlYzMoKS5zdWIocDAuYXNWZWMzKCkpKTtcclxuICAgICAgICBpZiAocmVzICYmICg8VmVjMz5yZXMpLnkgPj0gMCAmJiAoPFZlYzM+cmVzKS55IDw9IDEuMCAmJiAoPFZlYzM+cmVzKS56ID49IDAgJiYgKDxWZWMzPnJlcykueiA8PSAxLjAgJiYgKDxWZWMzPnJlcykueSArICg8VmVjMz5yZXMpLnogPD0gMS4wKSB7XHJcbiAgICAgICAgICByZXR1cm4gcDAuYXNWZWMzKClcclxuICAgICAgICAgICAgLmFkZChwMS5hc1ZlYzMoKS5zdWIocDAuYXNWZWMzKCkpLm11bHRpcGx5KCg8VmVjMz5yZXMpLnkpKVxyXG4gICAgICAgICAgICAuYWRkKHAyLmFzVmVjMygpLnN1YihwMC5hc1ZlYzMoKSkubXVsdGlwbHkoKDxWZWMzPnJlcykueikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0obWF0cml4OiBNYXRyaXg0KSB7XHJcbiAgICAgIGxldCB2MCA9IDxWZWM0Pm1hdHJpeC5tdWx0aXBseSh0aGlzLnAwLmFzVmVjNCgpKTtcclxuICAgICAgbGV0IHYxID0gPFZlYzQ+bWF0cml4Lm11bHRpcGx5KHRoaXMucDEuYXNWZWM0KCkpO1xyXG4gICAgICByZXR1cm4gbmV3IExpbmUzRChuZXcgUG9pbnQzRCh2MC54LCB2MC55LCB2MC56KSwgbmV3IFBvaW50M0QodjEueCwgdjEueSwgdjEueikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogVmVjMztcclxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogVmVjMztcclxuICAgIHByaXZhdGUgX3VwOiBWZWMzO1xyXG5cclxuICAgIHByaXZhdGUgY3VycmVudFZpZXdNYXRyaXg6IE1hdHJpeDQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb24/OiBWZWMzLCBkaXJlY3Rpb24/OiBWZWMzLCB1cD86IFZlYzMpIHtcclxuICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbiB8fCBuZXcgVmVjMygwLjAsIDAuMCwgMjAuMCk7XHJcbiAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbiB8fCBuZXcgVmVjMygwLjAsIDAuMCwgLTEuMCk7XHJcbiAgICAgIHRoaXMuX3VwID0gdXAgfHwgbmV3IFZlYzMoMC4wLCAxLjAsIDAuMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlZCgpIHtcclxuICAgICAgdGhpcy5jdXJyZW50Vmlld01hdHJpeCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlcikge1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbi54ID0geCB8fCAwLjA7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uLnkgPSB5IHx8IDAuMDtcclxuICAgICAgdGhpcy5fcG9zaXRpb24ueiA9IHogfHwgMC4wO1xyXG4gICAgICB0aGlzLmNoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXJlY3Rpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICB0aGlzLl9kaXJlY3Rpb24ueCA9IHg7XHJcbiAgICAgIHRoaXMuX2RpcmVjdGlvbi55ID0geTtcclxuICAgICAgdGhpcy5fZGlyZWN0aW9uLnogPSB6O1xyXG4gICAgICB0aGlzLmNoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDZW50ZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICB0aGlzLl9kaXJlY3Rpb24ueCA9IHggLSB0aGlzLl9wb3NpdGlvbi54O1xyXG4gICAgICB0aGlzLl9kaXJlY3Rpb24ueSA9IHkgLSB0aGlzLl9wb3NpdGlvbi55O1xyXG4gICAgICB0aGlzLl9kaXJlY3Rpb24ueiA9IHogLSB0aGlzLl9wb3NpdGlvbi56O1xyXG4gICAgICB0aGlzLmNoYW5nZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3NpdGlvbigpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjMygpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjNCgpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uLmFzVmVjNCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2plY3Rpb25NYXRyaXgod2lkdGgsIGhlaWdodCk6IE1hdHJpeDQge1xyXG4gICAgICByZXR1cm4gdGhpcy5tYWtlUGVyc3BlY3RpdmUoNDUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDAwLjApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpZXdNYXRyaXgoKTogTWF0cml4NCB7XHJcbiAgICAgIHJldHVybiA8cHNnZW9tZXRyeS5NYXRyaXg0PnRoaXMubWFrZUxvb2tBdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWFrZVBlcnNwZWN0aXZlKGZvdnksIGFzcGVjdCwgem5lYXIsIHpmYXIpOiBNYXRyaXg0IHtcclxuICAgICAgbGV0IHltYXggPSB6bmVhciAqIE1hdGgudGFuKGZvdnkgKiBNYXRoLlBJIC8gMzYwLjApO1xyXG4gICAgICBsZXQgeW1pbiA9IC15bWF4O1xyXG4gICAgICBsZXQgeG1pbiA9IHltaW4gKiBhc3BlY3Q7XHJcbiAgICAgIGxldCB4bWF4ID0geW1heCAqIGFzcGVjdDtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLm1ha2VGcnVzdHVtKHhtaW4sIHhtYXgsIHltaW4sIHltYXgsIHpuZWFyLCB6ZmFyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1ha2VGcnVzdHVtKGxlZnQsIHJpZ2h0LFxyXG4gICAgICBib3R0b20sIHRvcCxcclxuICAgICAgem5lYXIsIHpmYXIpOiBNYXRyaXg0IHtcclxuICAgICAgbGV0IHggPSAyICogem5lYXIgLyAocmlnaHQgLSBsZWZ0KTtcclxuICAgICAgbGV0IHkgPSAyICogem5lYXIgLyAodG9wIC0gYm90dG9tKTtcclxuICAgICAgbGV0IGEgPSAocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpO1xyXG4gICAgICBsZXQgYiA9ICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSk7XHJcbiAgICAgIGxldCBjID0gLSh6ZmFyICsgem5lYXIpIC8gKHpmYXIgLSB6bmVhcik7XHJcbiAgICAgIGxldCBkID0gLTIgKiB6ZmFyICogem5lYXIgLyAoemZhciAtIHpuZWFyKTtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgTWF0cml4NChcclxuICAgICAgICBbeCwgMCwgYSwgMCxcclxuICAgICAgICAgIDAsIHksIGIsIDAsXHJcbiAgICAgICAgICAwLCAwLCBjLCBkLFxyXG4gICAgICAgICAgMCwgMCwgLTEsIDBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1ha2VPcnRobyhsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIHpuZWFyLCB6ZmFyKTogTWF0cml4NCB7XHJcbiAgICAgIGxldCB0eCA9IC0ocmlnaHQgKyBsZWZ0KSAvIChyaWdodCAtIGxlZnQpO1xyXG4gICAgICBsZXQgdHkgPSAtKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKTtcclxuICAgICAgbGV0IHR6ID0gLSh6ZmFyICsgem5lYXIpIC8gKHpmYXIgLSB6bmVhcik7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDQoXHJcbiAgICAgICAgWzIgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgdHgsXHJcbiAgICAgICAgICAwLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIHR5LFxyXG4gICAgICAgICAgMCwgMCwgLTIgLyAoemZhciAtIHpuZWFyKSwgdHosXHJcbiAgICAgICAgICAwLCAwLCAwLCAxXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYWtlTG9va0F0KCk6IE1hdHJpeDQge1xyXG4gICAgICBsZXQgZXllID0gdGhpcy5fcG9zaXRpb247XHJcbiAgICAgIGxldCBjZW50ZXIgPSB0aGlzLl9wb3NpdGlvbi5hZGQodGhpcy5fZGlyZWN0aW9uKTtcclxuICAgICAgbGV0IHVwID0gdGhpcy5fdXA7XHJcblxyXG4gICAgICBsZXQgeiA9IGV5ZS5zdWIoY2VudGVyKS5ub3JtYWxpemUoKTtcclxuICAgICAgbGV0IHggPSB1cC5jcm9zcyh6KS5ub3JtYWxpemUoKTtcclxuICAgICAgbGV0IHkgPSB6LmNyb3NzKHgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgbGV0IG0gPSBuZXcgTWF0cml4NChbXHJcbiAgICAgICAgeC54LCB4LnksIHgueiwgMCxcclxuICAgICAgICB5LngsIHkueSwgeS56LCAwLFxyXG4gICAgICAgIHoueCwgei55LCB6LnosIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMV0pO1xyXG5cclxuICAgICAgbGV0IHQgPSBuZXcgTWF0cml4NChbXHJcbiAgICAgICAgMSwgMCwgMCwgLWV5ZS54LFxyXG4gICAgICAgIDAsIDEsIDAsIC1leWUueSxcclxuICAgICAgICAwLCAwLCAxLCAtZXllLnosXHJcbiAgICAgICAgMCwgMCwgMCwgMV0pO1xyXG5cclxuICAgICAgcmV0dXJuIDxNYXRyaXg0PnQubXVsdGlwbHkobSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwb2ludEluVHJpYW5nbGUocCwgYSwgYiwgYyk6IGJvb2xlYW4ge1xyXG4gICAgLy8gQ29tcHV0ZSB2ZWN0b3JzICAgICAgICBcclxuICAgIGxldCB2MCA9IGMuc3VidHJhY3QoYSk7XHJcbiAgICBsZXQgdjEgPSBiLnN1YnRyYWN0KGEpO1xyXG4gICAgbGV0IHYyID0gcC5zdWJ0cmFjdChhKTtcclxuXHJcbiAgICAvLyBDb21wdXRlIGRvdCBwcm9kdWN0c1xyXG4gICAgbGV0IGRvdDAwID0gdjAuZG90KHYwKVxyXG4gICAgbGV0IGRvdDAxID0gdjAuZG90KHYxKVxyXG4gICAgbGV0IGRvdDAyID0gdjAuZG90KHYyKVxyXG4gICAgbGV0IGRvdDExID0gdjEuZG90KHYxKVxyXG4gICAgbGV0IGRvdDEyID0gdjEuZG90KHYyKVxyXG5cclxuICAgIC8vIENvbXB1dGUgYmFyeWNlbnRyaWMgY29vcmRpbmF0ZXNcclxuICAgIGxldCBpbnZEZW5vbSA9IDEgLyAoZG90MDAgKiBkb3QxMSAtIGRvdDAxICogZG90MDEpXHJcbiAgICBsZXQgdSA9IChkb3QxMSAqIGRvdDAyIC0gZG90MDEgKiBkb3QxMikgKiBpbnZEZW5vbVxyXG4gICAgbGV0IHYgPSAoZG90MDAgKiBkb3QxMiAtIGRvdDAxICogZG90MDIpICogaW52RGVub21cclxuXHJcbiAgICAvLyBDaGVjayBpZiBwb2ludCBpcyBpbiB0cmlhbmdsZVxyXG4gICAgcmV0dXJuICh1ID49IDApICYmICh2ID49IDApICYmICh1ICsgdiA8IDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIGV4cG9ydCBjbGFzcyBWZWMyIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/OiBudW1iZXIsIHk/OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy54ID0geCB8fCAwLjA7XHJcbiAgICAgIHRoaXMueSA9IHkgfHwgMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdWIodjogVmVjMikge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zaWRlVHJpKGE6IFZlYzIsIGI6IFZlYzIsIGM6IFZlYzIsIHA6IFZlYzIpIHtcclxuICAgICAgcmV0dXJuIFZlYzIuY3Jvc3MoYy5zdWIoYiksIHAuc3ViKGIpKSA+PSAuMCAmJlxyXG4gICAgICAgIFZlYzIuY3Jvc3MoYS5zdWIoYyksIHAuc3ViKGMpKSA+PSAuMCAmJlxyXG4gICAgICAgIFZlYzIuY3Jvc3MoYi5zdWIoYSksIHAuc3ViKGEpKSA+PSAuMDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcm9zcyh2MDogVmVjMiwgdjE6IFZlYzIpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gdjAueCAqIHYxLnkgLSB2MC55ICogdjEueDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgUG9seWdvbjJEIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBFcHNpbG9uID0gMWUtMTA7XHJcblxyXG4gICAgcHJpdmF0ZSB2ZXJ0aWNlczogQXJyYXk8VmVjMj4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IFZlcnRpY2VzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJ0aWNlcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVmVydGV4KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVmVjMih4LCB5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFZlY3Rvcih2OiBWZWMyKSB7XHJcbiAgICAgIHRoaXMudmVydGljZXMucHVzaCh2KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVG9BQUJCKGJveDogQUFCQjJEKSB7XHJcbiAgICAgIHRoaXMudmVydGljZXMuZm9yRWFjaCgocCkgPT4ge1xyXG4gICAgICAgIGJveC5hZGRWZWN0b3IocCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgdGhpcy52ZXJ0aWNlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcmVhKCk6IG51bWJlciB7XHJcbiAgICAgIC8vIHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExNjU5NDNcclxuICAgICAgbGV0IHJlc3VsdCA9IDA7XHJcblxyXG4gICAgICBsZXQgbiA9IHRoaXMudmVydGljZXMubGVuZ3RoO1xyXG4gICAgICBmb3IgKGxldCBpID0gbiAtIDEsIHEgPSAwOyBxIDwgbjsgaSA9IHErKykge1xyXG4gICAgICAgIHJlc3VsdCArPSB0aGlzLnZlcnRpY2VzW2ldLnggKiB0aGlzLnZlcnRpY2VzW3FdLnkgLSB0aGlzLnZlcnRpY2VzW3FdLnggKiB0aGlzLnZlcnRpY2VzW2ldLnk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQgKiAwLjU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNuaXAodTogbnVtYmVyLCB2OiBudW1iZXIsIHc6IG51bWJlciwgbjogbnVtYmVyLCBpbmRpY2VzOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICBsZXQgYSA9IHRoaXMudmVydGljZXNbaW5kaWNlc1t1XV07XHJcbiAgICAgIGxldCBiID0gdGhpcy52ZXJ0aWNlc1tpbmRpY2VzW3ZdXTtcclxuICAgICAgbGV0IGMgPSB0aGlzLnZlcnRpY2VzW2luZGljZXNbd11dO1xyXG4gICAgICBsZXQgcDogVmVjMjtcclxuXHJcbiAgICAgIHJlc3VsdCA9IChiLnggLSBhLngpICogKGMueSAtIGEueSkgLSAoYi55IC0gYS55KSAqIChjLnggLSBhLngpID4gUG9seWdvbjJELkVwc2lsb247XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gJiYgcmVzdWx0OyArK2kpIHtcclxuICAgICAgICBpZiAoKGkgIT0gdSkgJiYgKGkgIT0gdikgJiYgKGkgIT0gdykpIHtcclxuICAgICAgICAgIHAgPSB0aGlzLnZlcnRpY2VzW2luZGljZXNbaV1dO1xyXG4gICAgICAgICAgcmVzdWx0ID0gIVZlYzIuaW5zaWRlVHJpKGEsIGIsIGMsIHApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJpYW5ndWxhdGUoKTogUG9seWdvbjJEIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IG5ldyBQb2x5Z29uMkQoKTtcclxuXHJcbiAgICAgIGxldCBuID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAobiA+IDIpIHtcclxuICAgICAgICBsZXQgaW5kaWNlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nZXRBcmVhKCkgPiAuMCkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIGluZGljZXNbaV0gPSBpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkgaW5kaWNlc1tpXSA9IChuIC0gMSkgLSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG52ID0gbjtcclxuXHJcbiAgICAgICAgLyogIHJlbW92ZSBudi0yIFZlcnRpY2VzLCBjcmVhdGluZyAxIHRyaWFuZ2xlIGV2ZXJ5IHRpbWUgKi9cclxuICAgICAgICBsZXQgY291bnQgPSAyICogbnY7ICAgLyogZXJyb3IgZGV0ZWN0aW9uICovXHJcblxyXG4gICAgICAgIGZvciAobGV0IG0gPSAwLCB2ID0gbnYgLSAxOyBudiA+IDI7KSB7XHJcbiAgICAgICAgICAvKiBpZiB3ZSBsb29wLCBpdCBpcyBwcm9iYWJseSBhIG5vbi1zaW1wbGUgcG9seWdvbiAqL1xyXG4gICAgICAgICAgaWYgKDAgPj0gY291bnQtLSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvbHlnb24yRCgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8qIHRocmVlIGNvbnNlY3V0aXZlIHZlcnRpY2VzIGluIGN1cnJlbnQgcG9seWdvbiwgPHUsdix3PiAqL1xyXG4gICAgICAgICAgbGV0IHUgPSB2OyBpZiAobnYgPD0gdSkgdSA9IDA7ICAgICAvKiBwcmV2aW91cyAqL1xyXG4gICAgICAgICAgdiA9IHUgKyAxOyBpZiAobnYgPD0gdikgdiA9IDA7ICAgICAvKiBuZXcgdiAgICAqL1xyXG4gICAgICAgICAgbGV0IHcgPSB2ICsgMTsgaWYgKG52IDw9IHcpIHcgPSAwOyAgICAgLyogbmV4dCAgICAgKi9cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5zbmlwKHUsIHYsIHcsIG52LCBpbmRpY2VzKSkge1xyXG4gICAgICAgICAgICBsZXQgYSwgYiwgYywgcywgdDtcclxuXHJcbiAgICAgICAgICAgIC8qIHRydWUgbmFtZXMgb2YgdGhlIHZlcnRpY2VzICovXHJcbiAgICAgICAgICAgIGEgPSBpbmRpY2VzW3VdOyBiID0gaW5kaWNlc1t2XTsgYyA9IGluZGljZXNbd107XHJcblxyXG4gICAgICAgICAgICAvKiBvdXRwdXQgVHJpYW5nbGUgKi9cclxuICAgICAgICAgICAgcmVzdWx0LmFkZFZlY3Rvcih0aGlzLnZlcnRpY2VzW2NdKTtcclxuICAgICAgICAgICAgcmVzdWx0LmFkZFZlY3Rvcih0aGlzLnZlcnRpY2VzW2JdKTtcclxuICAgICAgICAgICAgcmVzdWx0LmFkZFZlY3Rvcih0aGlzLnZlcnRpY2VzW2FdKTtcclxuXHJcbiAgICAgICAgICAgICsrbTtcclxuXHJcbiAgICAgICAgICAgIC8qIHJlbW92ZSB2IGZyb20gcmVtYWluaW5nIHBvbHlnb24gKi9cclxuICAgICAgICAgICAgZm9yIChzID0gdiwgdCA9IHYgKyAxOyB0IDwgbnY7IHMrKyAsIHQrKykge1xyXG4gICAgICAgICAgICAgIGluZGljZXNbc10gPSBpbmRpY2VzW3RdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC0tbnY7XHJcblxyXG4gICAgICAgICAgICAvKiByZXNldCBlcnJvciBkZXRlY3Rpb24gY291bnRlciAqL1xyXG4gICAgICAgICAgICBjb3VudCA9IDIgKiBudjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgQUFCQjJEIHtcclxuICAgIHB1YmxpYyBtaW5YOiBudW1iZXIgPSArSW5maW5pdHk7XHJcbiAgICBwdWJsaWMgbWF4WDogbnVtYmVyID0gLUluZmluaXR5O1xyXG4gICAgcHVibGljIG1pblk6IG51bWJlciA9ICtJbmZpbml0eTtcclxuICAgIHB1YmxpYyBtYXhZOiBudW1iZXIgPSAtSW5maW5pdHk7XHJcblxyXG4gICAgcHVibGljIGFkZFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMubWluWCA9IE1hdGgubWluKHRoaXMubWluWCwgeCk7XHJcbiAgICAgIHRoaXMubWF4WCA9IE1hdGgubWF4KHRoaXMubWF4WCwgeCk7XHJcbiAgICAgIHRoaXMubWluWSA9IE1hdGgubWluKHRoaXMubWluWSwgeSk7XHJcbiAgICAgIHRoaXMubWF4WSA9IE1hdGgubWF4KHRoaXMubWF4WSwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFZlY3Rvcih2OiBWZWMyIHwgVmVjMyB8IFZlYzQpIHtcclxuICAgICAgdGhpcy5hZGRQb2ludCh2LngsIHYueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEFBQkIoYm94OiBBQUJCMkQpIHtcclxuICAgICAgdGhpcy5hZGRQb2ludChib3gubWluWCwgYm94Lm1pblkpO1xyXG4gICAgICB0aGlzLmFkZFBvaW50KGJveC5tYXhYLCBib3gubWF4WSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLm1pblggPSArSW5maW5pdHk7XHJcbiAgICAgIHRoaXMubWF4WCA9IC1JbmZpbml0eTtcclxuICAgICAgdGhpcy5taW5ZID0gK0luZmluaXR5O1xyXG4gICAgICB0aGlzLm1heFkgPSAtSW5maW5pdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNlbnRlcigpOiBWZWMyIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMyKFxyXG4gICAgICAgIC41ICogKHRoaXMubWluWCArIHRoaXMubWF4WCksXHJcbiAgICAgICAgLjUgKiAodGhpcy5taW5ZICsgdGhpcy5tYXhZKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHRlbnRzKCk6IFZlYzIge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzIoXHJcbiAgICAgICAgKHRoaXMubWF4WCAtIHRoaXMubWluWCksXHJcbiAgICAgICAgKHRoaXMubWF4WSAtIHRoaXMubWluWSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWluKCk6IFZlYzIge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzIoXHJcbiAgICAgICAgdGhpcy5taW5YLFxyXG4gICAgICAgIHRoaXMubWluWVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXgoKTogVmVjMiB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjMihcclxuICAgICAgICB0aGlzLm1heFgsXHJcbiAgICAgICAgdGhpcy5tYXhZXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnRhaW5zKHY6IFZlYzIgfCBWZWMzIHwgVmVjNCkge1xyXG4gICAgICByZXR1cm4gdi54ID49IHRoaXMubWluWCAmJiB2LnggPD0gdGhpcy5tYXhYICYmXHJcbiAgICAgICAgdi55ID49IHRoaXMubWluWSAmJiB2LnkgPD0gdGhpcy5tYXhZXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmVwcmVzZW50cyBhIHBvaW50IGluIDNEIHNwYWNlIHVzaW5nIHNwaGVyaWNhbCBjb29yZGluYXRlcy5cclxuICAgKi9cclxuICBleHBvcnQgY2xhc3MgU3BoZXJpY2FsIHtcclxuXHJcbiAgICBwdWJsaWMgciA9IDA7XHJcbiAgICBwdWJsaWMgYXppbXV0aCA9IDA7XHJcbiAgICBwdWJsaWMgcG9sYXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGF6aW11dGg6IG51bWJlciwgcG9sYXI6IG51bWJlcikge1xyXG4gICAgICB0aGlzLnIgPSByO1xyXG4gICAgICB0aGlzLmF6aW11dGggPSBhemltdXRoO1xyXG4gICAgICB0aGlzLnBvbGFyID0gcG9sYXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbnZlcnRzIGNhcnRlc2lhbiBjb29yZGluYXRlcyB4LHkseiB0byBzcGhlcmljYWwgY29vcmRpbmF0ZXMuXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZyb21DYXJ0ZXNpYW4oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IFNwaGVyaWNhbCB7XHJcbiAgICAgIGxldCByID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XHJcbiAgICAgIHJldHVybiBuZXcgU3BoZXJpY2FsKFxyXG4gICAgICAgIHIsXHJcbiAgICAgICAgTWF0aC5hc2luKHkgLyByKSxcclxuICAgICAgICBNYXRoLmF0YW4yKC14LCB6KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbnZlcnRzIGNhcnRlc2lhbiB2ZWN0b3IgdG8gc3BoZXJpY2FsIGNvb3JkaW5hdGVzLlxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGcm9tQ2FydGVzaWFuVmVjdG9yKHY6IFZlYzQgfCBWZWMzKSB7XHJcbiAgICAgIHJldHVybiBTcGhlcmljYWwuRnJvbUNhcnRlc2lhbih2LngsIHYueSwgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udmVydHMgc3BoZXJpY2FsIGNvb3JkaW5hdGVzIHRvIGNhcnRlc2lhbiB2ZWN0b3IuXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRvQ2FydGVzaWFuKHI6IG51bWJlciwgcG9sYXI6IG51bWJlciwgYXppbXV0aDogbnVtYmVyKTogVmVjNCB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjNChyICogTWF0aC5jb3MocG9sYXIpICogTWF0aC5zaW4oYXppbXV0aCksXHJcbiAgICAgICAgLXIgKiBNYXRoLnNpbihwb2xhciksXHJcbiAgICAgICAgLXIgKiBNYXRoLmNvcyhwb2xhcikgKiBNYXRoLmNvcyhhemltdXRoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbnZlcnRzIHNwaGVyaWNhbCBjb29yZGluYXRlcyB0byBjYXJ0ZXNpYW4gdmVjdG9yLlxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHRvQ2FydGVzaWFuKCk6IFZlYzQge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzQodGhpcy5yICogTWF0aC5jb3ModGhpcy5wb2xhcikgKiBNYXRoLnNpbih0aGlzLmF6aW11dGgpLFxyXG4gICAgICAgIC10aGlzLnIgKiBNYXRoLnNpbih0aGlzLnBvbGFyKSxcclxuICAgICAgICAtdGhpcy5yICogTWF0aC5jb3ModGhpcy5wb2xhcikgKiBNYXRoLmNvcyh0aGlzLmF6aW11dGgpKTtcclxuICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19