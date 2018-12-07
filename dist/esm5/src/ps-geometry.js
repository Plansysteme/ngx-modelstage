/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
export var psgeometry;
(function (psgeometry) {
    var Matrix4 = /** @class */ (function () {
        function Matrix4(elements) {
            this.elements = elements || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        Matrix4.FromTranslation = /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            /** @type {?} */
            var result = new Matrix4();
            result.elements[3] = x;
            result.elements[7] = y;
            result.elements[11] = z;
            return result;
        };
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        Matrix4.FromScaling = /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            /** @type {?} */
            var result = new Matrix4();
            result.elements[0] = x;
            result.elements[5] = y;
            result.elements[10] = z;
            return result;
        };
        /**
         * @param {?} angle
         * @return {?}
         */
        Matrix4.FromRotationX = /**
         * @param {?} angle
         * @return {?}
         */
        function (angle) {
            /** @type {?} */
            var cosA = Math.cos(angle);
            /** @type {?} */
            var sinA = Math.sin(angle);
            /** @type {?} */
            var result = new Matrix4();
            result.elements[5] = cosA;
            result.elements[6] = -sinA;
            result.elements[9] = sinA;
            result.elements[10] = cosA;
            return result;
        };
        /**
         * @param {?} angle
         * @return {?}
         */
        Matrix4.FromRotationY = /**
         * @param {?} angle
         * @return {?}
         */
        function (angle) {
            /** @type {?} */
            var cosA = Math.cos(angle);
            /** @type {?} */
            var sinA = Math.sin(angle);
            /** @type {?} */
            var result = new Matrix4();
            result.elements[0] = cosA;
            result.elements[2] = sinA;
            result.elements[8] = -sinA;
            result.elements[10] = cosA;
            return result;
        };
        /**
         * @param {?} angle
         * @return {?}
         */
        Matrix4.FromRotationZ = /**
         * @param {?} angle
         * @return {?}
         */
        function (angle) {
            /** @type {?} */
            var cosA = Math.cos(angle);
            /** @type {?} */
            var sinA = Math.sin(angle);
            /** @type {?} */
            var result = new Matrix4();
            result.elements[0] = cosA;
            result.elements[1] = -sinA;
            result.elements[4] = sinA;
            result.elements[5] = cosA;
            return result;
        };
        /**
         * @param {?} pitch
         * @param {?} yaw
         * @param {?} roll
         * @return {?}
         */
        Matrix4.FromRotation = /**
         * @param {?} pitch
         * @param {?} yaw
         * @param {?} roll
         * @return {?}
         */
        function (pitch, yaw, roll) {
            return new Matrix4([
                Math.cos(yaw) * Math.cos(pitch), Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), 0,
                Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) - Math.sin(yaw) * Math.cos(roll), Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) + Math.cos(yaw) * Math.cos(roll), Math.cos(pitch) * Math.sin(roll), 0,
                Math.cos(yaw) * Math.sin(pitch) * Math.cos(roll) + Math.sin(yaw) * Math.sin(roll), Math.sin(yaw) * Math.sin(pitch) * Math.cos(roll) - Math.cos(yaw) * Math.sin(roll), Math.cos(pitch) * Math.cos(roll), 0,
                0, 0, 0, 1
            ]).transpose();
        };
        /**
         * @param {?} colIdx
         * @param {?} rowIdx
         * @return {?}
         */
        Matrix4.prototype.e = /**
         * @param {?} colIdx
         * @param {?} rowIdx
         * @return {?}
         */
        function (colIdx, rowIdx) {
            /** @type {?} */
            var idx = colIdx + (rowIdx || 0) * 4;
            return idx >= 0 && idx < 16 ? this.elements[idx] : null;
        };
        ;
        /**
         * @param {?} idx
         * @return {?}
         */
        Matrix4.prototype.row = /**
         * @param {?} idx
         * @return {?}
         */
        function (idx) {
            if (idx >= 0 && idx < 4) {
                return new Vec4(this.elements[idx * 4], this.elements[idx * 4 + 1], this.elements[idx * 4 + 2], this.elements[idx * 4 + 3]);
            }
            else {
                return null;
            }
        };
        ;
        /**
         * @param {?} idx
         * @return {?}
         */
        Matrix4.prototype.col = /**
         * @param {?} idx
         * @return {?}
         */
        function (idx) {
            if (idx <= 0 && idx < 4) {
                return new Vec4(this.elements[idx], this.elements[idx + 4], this.elements[idx + 8], this.elements[idx + 12]);
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} m
         * @return {?}
         */
        Matrix4.prototype.equals = /**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            if (m) {
                /** @type {?} */
                var l = this.elements;
                /** @type {?} */
                var r = m.elements;
                return l[0] == r[0] && l[1] == r[1] && l[2] == r[2] && l[3] == r[3] &&
                    l[4] == r[4] && l[5] == r[5] && l[6] == r[6] && l[7] == r[7] &&
                    l[8] == r[8] && l[9] == r[9] && l[10] == r[10] && l[11] == r[11] &&
                    l[12] == r[12] && l[13] == r[13] && l[14] == r[14] && l[15] == r[15];
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} m
         * @return {?}
         */
        Matrix4.prototype.multiply = /**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            if (m instanceof Matrix4) {
                /** @type {?} */
                var l = this.elements;
                /** @type {?} */
                var r = m.elements;
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
        };
        /**
         * @return {?}
         */
        Matrix4.prototype.toRightTriangular = /**
         * @return {?}
         */
        function () {
            return new Matrix4(Matrix.toRightTriangular(this.elements, 4, 4));
        };
        /**
         * @return {?}
         */
        Matrix4.prototype.determinant = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var m = this.toRightTriangular();
            return m.elements[0] * m.elements[5] * m.elements[10] * m.elements[15];
        };
        /**
         * @return {?}
         */
        Matrix4.prototype.isSingular = /**
         * @return {?}
         */
        function () {
            return this.determinant() === 0;
        };
        /**
         * @return {?}
         */
        Matrix4.prototype.transpose = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var e = this.elements;
            return new Matrix4([
                e[0], e[4], e[8], e[12],
                e[1], e[5], e[9], e[13],
                e[2], e[6], e[10], e[14],
                e[3], e[7], e[11], e[15]
            ]);
        };
        /**
         * @return {?}
         */
        Matrix4.prototype.inverse = /**
         * @return {?}
         */
        function () {
            if (!this.isSingular()) {
                /** @type {?} */
                var augmentedMatrix = [
                    this.elements[0], this.elements[1], this.elements[2], this.elements[3], 1, 0, 0, 0,
                    this.elements[4], this.elements[5], this.elements[6], this.elements[7], 0, 1, 0, 0,
                    this.elements[8], this.elements[9], this.elements[10], this.elements[11], 0, 0, 1, 0,
                    this.elements[12], this.elements[13], this.elements[14], this.elements[15], 0, 0, 0, 1
                ];
                /** @type {?} */
                var m = Matrix.toRightTriangular(augmentedMatrix, 4, 8);
                for (var row = 3; row >= 0; row--) {
                    /** @type {?} */
                    var divisor = m[row * 9];
                    for (var col = 0; col < 8; col++) {
                        m[row * 8 + col] = m[row * 8 + col] / divisor;
                    }
                    for (var altrow = row - 1; altrow >= 0; altrow--) {
                        /** @type {?} */
                        var multiplier = m[altrow * 8 + row];
                        for (var col = 0; col < 8; col++) {
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
        };
        Matrix4.Identity = new Matrix4();
        return Matrix4;
    }());
    psgeometry.Matrix4 = Matrix4;
    if (false) {
        /** @type {?} */
        Matrix4.Identity;
        /** @type {?} */
        Matrix4.prototype.elements;
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
    }
    var Matrix3 = /** @class */ (function () {
        function Matrix3(elements) {
            this.elements = elements || [1, 0, 0, 0, 1, 0, 0, 0, 1];
        }
        /**
         * @param {?} colIdx
         * @param {?} rowIdx
         * @return {?}
         */
        Matrix3.prototype.e = /**
         * @param {?} colIdx
         * @param {?} rowIdx
         * @return {?}
         */
        function (colIdx, rowIdx) {
            /** @type {?} */
            var idx = colIdx + (rowIdx || 0) * 3;
            return idx >= 0 && idx < 9 ? this.elements[idx] : null;
        };
        /**
         * @param {?} idx
         * @return {?}
         */
        Matrix3.prototype.row = /**
         * @param {?} idx
         * @return {?}
         */
        function (idx) {
            if (idx >= 0 && idx < 3) {
                return new Vec3(this.elements[idx * 3], this.elements[idx * 3 + 1], this.elements[idx * 3 + 2]);
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} idx
         * @return {?}
         */
        Matrix3.prototype.col = /**
         * @param {?} idx
         * @return {?}
         */
        function (idx) {
            if (idx <= 0 && idx < 3) {
                return new Vec3(this.elements[idx], this.elements[idx + 3], this.elements[idx + 6]);
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} m
         * @return {?}
         */
        Matrix3.prototype.multiply = /**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            if (m instanceof Matrix3) {
                /** @type {?} */
                var l = this.elements;
                /** @type {?} */
                var r = m.elements;
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
        };
        /**
         * @return {?}
         */
        Matrix3.prototype.toRightTriangular = /**
         * @return {?}
         */
        function () {
            return new Matrix3(Matrix.toRightTriangular(this.elements, 3, 3));
        };
        /**
         * @return {?}
         */
        Matrix3.prototype.determinant = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var m = this.toRightTriangular();
            return m.elements[0] * m.elements[4] * m.elements[8];
        };
        /**
         * @return {?}
         */
        Matrix3.prototype.isSingular = /**
         * @return {?}
         */
        function () {
            return this.determinant() === 0;
        };
        /**
         * @return {?}
         */
        Matrix3.prototype.transpose = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var e = this.elements;
            return new Matrix3([
                e[0], e[3], e[6],
                e[1], e[4], e[7],
                e[2], e[5], e[8]
            ]);
        };
        /**
         * @return {?}
         */
        Matrix3.prototype.inverse = /**
         * @return {?}
         */
        function () {
            if (!this.isSingular()) {
                /** @type {?} */
                var augmentedMatrix = [
                    this.elements[0], this.elements[1], this.elements[2], 1, 0, 0,
                    this.elements[3], this.elements[4], this.elements[5], 0, 1, 0,
                    this.elements[6], this.elements[7], this.elements[8], 0, 0, 1,
                ];
                /** @type {?} */
                var m = Matrix.toRightTriangular(augmentedMatrix, 3, 6);
                for (var row = 2; row >= 0; row--) {
                    /** @type {?} */
                    var divisor = m[row * 7];
                    for (var col = 0; col < 6; col++) {
                        m[row * 7 + col] = m[row * 7 + col] / divisor;
                    }
                    for (var altrow = row - 1; altrow >= 0; altrow--) {
                        /** @type {?} */
                        var multiplier = m[altrow * 6 + row];
                        for (var col = 0; col < 6; col++) {
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
        };
        Matrix3.Identity = new Matrix3();
        return Matrix3;
    }());
    psgeometry.Matrix3 = Matrix3;
    if (false) {
        /** @type {?} */
        Matrix3.Identity;
        /** @type {?} */
        Matrix3.prototype.elements;
    }
    var Matrix = /** @class */ (function () {
        function Matrix() {
        }
        /**
         * @param {?} elements
         * @param {?} rows
         * @param {?} cols
         * @return {?}
         */
        Matrix.toRightTriangular = /**
         * @param {?} elements
         * @param {?} rows
         * @param {?} cols
         * @return {?}
         */
        function (elements, rows, cols) {
            /** @type {?} */
            var m = elements.slice(0);
            for (var row = 0; row < rows; row++) {
                if (m[row * (cols + 1)] == 0) {
                    for (var altrow = row + 1; altrow < rows; altrow++) {
                        if (m[altrow * cols + row] != 0) {
                            for (var j = 0; j < cols; j++) {
                                m[row * cols + j] += m[altrow * cols + j];
                            }
                            break;
                        }
                    }
                }
                if (m[row * (cols + 1)] != 0) {
                    for (var altrow = row + 1; altrow < rows; altrow++) {
                        /** @type {?} */
                        var multiplier = m[altrow * cols + row] / m[row * (cols + 1)];
                        for (var j = 0; j < cols; j++) {
                            m[altrow * cols + j] = j < row ? 0 : m[altrow * cols + j] - m[row * cols + j] * multiplier;
                        }
                    }
                }
            }
            return m;
        };
        return Matrix;
    }());
    psgeometry.Matrix = Matrix;
    var Vec3 = /** @class */ (function () {
        function Vec3(x, y, z) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
        }
        /**
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        Vec3.prototype.asVec3 = /**
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        function () {
            return (/** @type {?} */ (this));
        };
        /**
         * @param {?=} w
         * @return {?}
         */
        Vec3.prototype.asVec4 = /**
         * @param {?=} w
         * @return {?}
         */
        function (w) {
            return new Vec4(this.x, this.y, this.z, w || 1.0);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Vec3.prototype.equals = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return this.x == v.x && this.y == v.y && this.z == v.z;
        };
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        Vec3.prototype.assignPoint = /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Vec3.prototype.assignVec = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        };
        /**
         * @param {?} vec
         * @return {?}
         */
        Vec3.prototype.add = /**
         * @param {?} vec
         * @return {?}
         */
        function (vec) {
            return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
        };
        /**
         * @param {?} vec
         * @return {?}
         */
        Vec3.prototype.sub = /**
         * @param {?} vec
         * @return {?}
         */
        function (vec) {
            return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
        };
        /**
         * @param {?} vec
         * @return {?}
         */
        Vec3.prototype.dot = /**
         * @param {?} vec
         * @return {?}
         */
        function (vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z;
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Vec3.prototype.cross = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return new Vec3((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x));
        };
        /**
         * @param {?} s
         * @return {?}
         */
        Vec3.prototype.multiply = /**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            return new Vec3(this.x * s, this.y * s, this.z * s);
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} q
         * @return {THIS}
         */
        Vec3.prototype.applyQuaternion = /**
         * @template THIS
         * @this {THIS}
         * @param {?} q
         * @return {THIS}
         */
        function (q) {
            /** @type {?} */
            var x = (/** @type {?} */ (this)).x;
            /** @type {?} */
            var y = (/** @type {?} */ (this)).y;
            /** @type {?} */
            var z = (/** @type {?} */ (this)).z;
            /** @type {?} */
            var qx = q.x;
            /** @type {?} */
            var qy = q.y;
            /** @type {?} */
            var qz = q.z;
            /** @type {?} */
            var qw = q.w;
            // quaternion * vector
            /** @type {?} */
            var px = qw * x + qy * z - qz * y;
            /** @type {?} */
            var py = qw * y + qz * x - qx * z;
            /** @type {?} */
            var pz = qw * z + qx * y - qy * x;
            /** @type {?} */
            var pw = -qx * x - qy * y - qz * z;
            // product * inverse quaternion
            (/** @type {?} */ (this)).x = px * qw - pw * qx - py * qz + pz * qy;
            (/** @type {?} */ (this)).y = py * qw - pw * qy - pz * qx + px * qz;
            (/** @type {?} */ (this)).z = pz * qw - pw * qz - px * qy + py * qx;
            return (/** @type {?} */ (this));
        };
        /**
         * @return {?}
         */
        Vec3.prototype.norm = /**
         * @return {?}
         */
        function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        };
        /**
         * @return {?}
         */
        Vec3.prototype.normalize = /**
         * @return {?}
         */
        function () {
            return this.multiply(1 / this.norm());
        };
        /**
         * @return {?}
         */
        Vec3.prototype.elements = /**
         * @return {?}
         */
        function () {
            return [this.x, this.y, this.z];
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Vec3.prototype.squaredDist = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return (this.x - v.x) * (this.x - v.x) +
                (this.y - v.y) * (this.y - v.y) +
                (this.z - v.z) * (this.z - v.z);
        };
        return Vec3;
    }());
    psgeometry.Vec3 = Vec3;
    if (false) {
        /** @type {?} */
        Vec3.prototype.x;
        /** @type {?} */
        Vec3.prototype.y;
        /** @type {?} */
        Vec3.prototype.z;
    }
    var Vec4 = /** @class */ (function () {
        function Vec4(x, y, z, w) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
            this.w = w || 0.0;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        Vec4.prototype.equals = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
        };
        /**
         * @return {?}
         */
        Vec4.prototype.asVec3 = /**
         * @return {?}
         */
        function () {
            return new Vec3(this.x, this.y, this.z);
        };
        /**
         * @return {?}
         */
        Vec4.prototype.asVec4 = /**
         * @return {?}
         */
        function () {
            return this;
        };
        /**
         * @param {?} vec
         * @return {?}
         */
        Vec4.prototype.add = /**
         * @param {?} vec
         * @return {?}
         */
        function (vec) {
            return new Vec4(this.x + vec.x, this.y + vec.y, this.z + vec.z, this.w + vec.w);
        };
        /**
         * @param {?} vec
         * @return {?}
         */
        Vec4.prototype.sub = /**
         * @param {?} vec
         * @return {?}
         */
        function (vec) {
            return new Vec4(this.x - vec.x, this.y - vec.y, this.z - vec.z, this.w - vec.w);
        };
        /**
         * @param {?} vec
         * @return {?}
         */
        Vec4.prototype.dot = /**
         * @param {?} vec
         * @return {?}
         */
        function (vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Vec4.prototype.cross = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return new Vec4((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x), 1.0);
        };
        /**
         * @param {?} s
         * @return {?}
         */
        Vec4.prototype.multiply = /**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            return new Vec4(this.x * s, this.y * s, this.z * s, this.w * s);
        };
        /**
         * @return {?}
         */
        Vec4.prototype.norm = /**
         * @return {?}
         */
        function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        };
        /**
         * @return {?}
         */
        Vec4.prototype.normalize = /**
         * @return {?}
         */
        function () {
            return this.multiply(1 / this.norm());
        };
        /**
         * @return {?}
         */
        Vec4.prototype.elements = /**
         * @return {?}
         */
        function () {
            return [this.x, this.y, this.z, this.w];
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Vec4.prototype.squaredDist = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return (this.x - v.x) * (this.x - v.x) +
                (this.y - v.y) * (this.y - v.y) +
                (this.z - v.z) * (this.z - v.z) +
                (this.w - v.w) * (this.w - v.w);
        };
        Vec4.Zero = new Vec4(0.0, 0.0, 0.0, 0.0);
        Vec4.One = new Vec4(1.0, 1.0, 1.0, 1.0);
        return Vec4;
    }());
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
    var Quaternion = /** @class */ (function () {
        function Quaternion(x, y, z, w) {
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
        Quaternion.prototype.setFromAxisAngle = /**
         * @param {?} axis
         * @param {?} angle
         * @return {?}
         */
        function (axis, angle) {
            /** @type {?} */
            var halfAngle = angle / 2;
            /** @type {?} */
            var s = Math.sin(halfAngle);
            this.x = axis.x * s;
            this.y = axis.y * s;
            this.z = axis.z * s;
            this.w = Math.cos(halfAngle);
            return this;
        };
        /**
         * @param {?} q
         * @return {?}
         */
        Quaternion.prototype.multiply = /**
         * @param {?} q
         * @return {?}
         */
        function (q) {
            /** @type {?} */
            var x = this.x;
            /** @type {?} */
            var y = this.y;
            /** @type {?} */
            var z = this.z;
            /** @type {?} */
            var w = this.w;
            /** @type {?} */
            var qx = q.x;
            /** @type {?} */
            var qy = q.y;
            /** @type {?} */
            var qz = q.z;
            /** @type {?} */
            var qw = q.w;
            this.x = x * qw + w * qx + y * qz - z * qy;
            this.y = y * qw + w * qy + z * qx - x * qz;
            this.z = z * qw + w * qz + x * qy - y * qx;
            this.w = w * qw - x * qx - y * qy - z * qz;
        };
        return Quaternion;
    }());
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
    var AABB3D = /** @class */ (function () {
        function AABB3D() {
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
        AABB3D.prototype.addPoint = /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            this.minX = Math.min(this.minX, x);
            this.maxX = Math.max(this.maxX, x);
            this.minY = Math.min(this.minY, y);
            this.maxY = Math.max(this.maxY, y);
            this.minZ = Math.min(this.minZ, z);
            this.maxZ = Math.max(this.maxZ, z);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        AABB3D.prototype.addVector = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.addPoint(v.x, v.y, v.z);
        };
        /**
         * @param {?} box
         * @return {?}
         */
        AABB3D.prototype.addAABB = /**
         * @param {?} box
         * @return {?}
         */
        function (box) {
            this.addPoint(box.minX, box.minY, box.minZ);
            this.addPoint(box.maxX, box.maxY, box.maxZ);
        };
        /**
         * @return {?}
         */
        AABB3D.prototype.clear = /**
         * @return {?}
         */
        function () {
            this.minX = +Infinity;
            this.maxX = -Infinity;
            this.minY = +Infinity;
            this.maxY = -Infinity;
            this.minZ = +Infinity;
            this.maxZ = -Infinity;
        };
        /**
         * @return {?}
         */
        AABB3D.prototype.center = /**
         * @return {?}
         */
        function () {
            return new Vec3(.5 * (this.minX + this.maxX), .5 * (this.minY + this.maxY), .5 * (this.minZ + this.maxZ));
        };
        /**
         * @return {?}
         */
        AABB3D.prototype.extents = /**
         * @return {?}
         */
        function () {
            return new Vec3((this.maxX - this.minX), (this.maxY - this.minY), (this.maxZ - this.minZ));
        };
        /**
         * @return {?}
         */
        AABB3D.prototype.min = /**
         * @return {?}
         */
        function () {
            return new Vec3(this.minX, this.minY, this.minZ);
        };
        /**
         * @return {?}
         */
        AABB3D.prototype.max = /**
         * @return {?}
         */
        function () {
            return new Vec3(this.maxX, this.maxY, this.maxZ);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        AABB3D.prototype.contains = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return v.x >= this.minX && v.x <= this.maxX &&
                v.y >= this.minY && v.y <= this.maxY &&
                v.z >= this.minZ && v.z <= this.maxZ;
        };
        /**
         * @param {?} matrix
         * @return {?}
         */
        AABB3D.prototype.transform = /**
         * @param {?} matrix
         * @return {?}
         */
        function (matrix) {
            /** @type {?} */
            var result = new AABB3D();
            /** @type {?} */
            var minV = (/** @type {?} */ (matrix.multiply(new Vec4(this.minX, this.minY, this.minZ, 1))));
            /** @type {?} */
            var maxV = (/** @type {?} */ (matrix.multiply(new Vec4(this.maxX, this.maxY, this.maxZ, 1))));
            result.minX = minV.x;
            result.minY = minV.y;
            result.minZ = minV.z;
            result.maxX = maxV.x;
            result.maxY = maxV.y;
            result.maxZ = maxV.z;
            return result;
        };
        /**
         * @param {?} ray
         * @return {?}
         */
        AABB3D.prototype.intersectsRay = /**
         * @param {?} ray
         * @return {?}
         */
        function (ray) {
            /** @type {?} */
            var result = null;
            /** @type {?} */
            var v0 = ray.p0.asVec3();
            /** @type {?} */
            var dir = ray.p1.asVec3().sub(ray.p0.asVec3());
            /** @type {?} */
            var intX0 = ray.intersectRayWithPlane(new Vec3(this.minX, 0, 0), new Vec3(-1, 0, 0));
            /** @type {?} */
            var intX1 = ray.intersectRayWithPlane(new Vec3(this.maxX, 0, 0), new Vec3(1, 0, 0));
            /** @type {?} */
            var intY0 = ray.intersectRayWithPlane(new Vec3(0, this.minY, 0), new Vec3(0, -1, 0));
            /** @type {?} */
            var intY1 = ray.intersectRayWithPlane(new Vec3(0, this.maxY, 0), new Vec3(0, 1, 0));
            /** @type {?} */
            var intZ0 = ray.intersectRayWithPlane(new Vec3(0, 0, this.minZ), new Vec3(0, 0, -1));
            /** @type {?} */
            var intZ1 = ray.intersectRayWithPlane(new Vec3(0, 0, this.maxZ), new Vec3(0, 0, 1));
            /** @type {?} */
            var currDist = Infinity;
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
        };
        return AABB3D;
    }());
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
    var Point3D = /** @class */ (function () {
        function Point3D(x, y, z) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.z = z || 0.0;
        }
        /**
         * @return {?}
         */
        Point3D.prototype.asVec3 = /**
         * @return {?}
         */
        function () {
            return new Vec3(this.x, this.y, this.z);
        };
        /**
         * @param {?=} w
         * @return {?}
         */
        Point3D.prototype.asVec4 = /**
         * @param {?=} w
         * @return {?}
         */
        function (w) {
            return new Vec4(this.x, this.y, this.z, w || 1.0);
        };
        return Point3D;
    }());
    psgeometry.Point3D = Point3D;
    if (false) {
        /** @type {?} */
        Point3D.prototype.x;
        /** @type {?} */
        Point3D.prototype.y;
        /** @type {?} */
        Point3D.prototype.z;
    }
    var Line3D = /** @class */ (function () {
        function Line3D(p0, p1) {
            this.p0 = p0 || new Point3D();
            this.p1 = p1 || new Point3D();
        }
        /**
         * @param {?} v0
         * @param {?} n
         * @return {?}
         */
        Line3D.prototype.intersectRayWithPlane = /**
         * @param {?} v0
         * @param {?} n
         * @return {?}
         */
        function (v0, n) {
            /** @type {?} */
            var result = null;
            /** @type {?} */
            var u = this.p1.asVec3().sub(this.p0.asVec3());
            /** @type {?} */
            var D = n.dot(u);
            if (D != 0) {
                /** @type {?} */
                var w = this.p0.asVec3().sub(v0);
                /** @type {?} */
                var N = -n.dot(w);
                /** @type {?} */
                var sI = N / D;
                if (sI >= 0) {
                    result = this.p0.asVec3().add(u.multiply(sI));
                }
            }
            return result;
        };
        /**
         * @param {?} p0
         * @param {?} p1
         * @param {?} p2
         * @return {?}
         */
        Line3D.prototype.intersectTriangle = /**
         * @param {?} p0
         * @param {?} p1
         * @param {?} p2
         * @return {?}
         */
        function (p0, p1, p2) {
            /** @type {?} */
            var matrix = new Matrix3([
                this.p0.x - this.p1.x, p1.x - p0.x, p2.x - p0.x,
                this.p0.y - this.p1.y, p1.y - p0.y, p2.y - p0.y,
                this.p0.z - this.p1.z, p1.z - p0.z, p2.z - p0.z
            ]).inverse();
            if (matrix) {
                /** @type {?} */
                var res = matrix.multiply(this.p0.asVec3().sub(p0.asVec3()));
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
        };
        /**
         * @param {?} matrix
         * @return {?}
         */
        Line3D.prototype.transform = /**
         * @param {?} matrix
         * @return {?}
         */
        function (matrix) {
            /** @type {?} */
            var v0 = (/** @type {?} */ (matrix.multiply(this.p0.asVec4())));
            /** @type {?} */
            var v1 = (/** @type {?} */ (matrix.multiply(this.p1.asVec4())));
            return new Line3D(new Point3D(v0.x, v0.y, v0.z), new Point3D(v1.x, v1.y, v1.z));
        };
        return Line3D;
    }());
    psgeometry.Line3D = Line3D;
    if (false) {
        /** @type {?} */
        Line3D.prototype.p0;
        /** @type {?} */
        Line3D.prototype.p1;
    }
    var Camera = /** @class */ (function () {
        function Camera(position, direction, up) {
            this._position = position || new Vec3(0.0, 0.0, 20.0);
            this._direction = direction || new Vec3(0.0, 0.0, -1.0);
            this._up = up || new Vec3(0.0, 1.0, 0.0);
        }
        /**
         * @return {?}
         */
        Camera.prototype.changed = /**
         * @return {?}
         */
        function () {
            this.currentViewMatrix = null;
        };
        /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         * @return {?}
         */
        Camera.prototype.setPosition = /**
         * @param {?=} x
         * @param {?=} y
         * @param {?=} z
         * @return {?}
         */
        function (x, y, z) {
            this._position.x = x || 0.0;
            this._position.y = y || 0.0;
            this._position.z = z || 0.0;
            this.changed();
        };
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        Camera.prototype.setDirection = /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            this._direction.x = x;
            this._direction.y = y;
            this._direction.z = z;
            this.changed();
        };
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        Camera.prototype.setCenter = /**
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            this._direction.x = x - this._position.x;
            this._direction.y = y - this._position.y;
            this._direction.z = z - this._position.z;
            this.changed();
        };
        /**
         * @return {?}
         */
        Camera.prototype.getPosition = /**
         * @return {?}
         */
        function () {
            return this._position;
        };
        /**
         * @return {?}
         */
        Camera.prototype.asVec3 = /**
         * @return {?}
         */
        function () {
            return this._position;
        };
        /**
         * @return {?}
         */
        Camera.prototype.asVec4 = /**
         * @return {?}
         */
        function () {
            return this._position.asVec4();
        };
        /**
         * @param {?} width
         * @param {?} height
         * @return {?}
         */
        Camera.prototype.getProjectionMatrix = /**
         * @param {?} width
         * @param {?} height
         * @return {?}
         */
        function (width, height) {
            return this.makePerspective(45, width / height, 0.1, 10000.0);
        };
        /**
         * @return {?}
         */
        Camera.prototype.getViewMatrix = /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.makeLookAt()));
        };
        /**
         * @private
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        Camera.prototype.makePerspective = /**
         * @private
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        function (fovy, aspect, znear, zfar) {
            /** @type {?} */
            var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
            /** @type {?} */
            var ymin = -ymax;
            /** @type {?} */
            var xmin = ymin * aspect;
            /** @type {?} */
            var xmax = ymax * aspect;
            return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
        };
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
        Camera.prototype.makeFrustum = /**
         * @private
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        function (left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            var x = 2 * znear / (right - left);
            /** @type {?} */
            var y = 2 * znear / (top - bottom);
            /** @type {?} */
            var a = (right + left) / (right - left);
            /** @type {?} */
            var b = (top + bottom) / (top - bottom);
            /** @type {?} */
            var c = -(zfar + znear) / (zfar - znear);
            /** @type {?} */
            var d = -2 * zfar * znear / (zfar - znear);
            return new Matrix4([x, 0, a, 0,
                0, y, b, 0,
                0, 0, c, d,
                0, 0, -1, 0]);
        };
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
        Camera.prototype.makeOrtho = /**
         * @private
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        function (left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            var tx = -(right + left) / (right - left);
            /** @type {?} */
            var ty = -(top + bottom) / (top - bottom);
            /** @type {?} */
            var tz = -(zfar + znear) / (zfar - znear);
            return new Matrix4([2 / (right - left), 0, 0, tx,
                0, 2 / (top - bottom), 0, ty,
                0, 0, -2 / (zfar - znear), tz,
                0, 0, 0, 1]);
        };
        /**
         * @private
         * @return {?}
         */
        Camera.prototype.makeLookAt = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var eye = this._position;
            /** @type {?} */
            var center = this._position.add(this._direction);
            /** @type {?} */
            var up = this._up;
            /** @type {?} */
            var z = eye.sub(center).normalize();
            /** @type {?} */
            var x = up.cross(z).normalize();
            /** @type {?} */
            var y = z.cross(x).normalize();
            /** @type {?} */
            var m = new Matrix4([
                x.x, x.y, x.z, 0,
                y.x, y.y, y.z, 0,
                z.x, z.y, z.z, 0,
                0, 0, 0, 1
            ]);
            /** @type {?} */
            var t = new Matrix4([
                1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1
            ]);
            return (/** @type {?} */ (t.multiply(m)));
        };
        return Camera;
    }());
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
        var v0 = c.subtract(a);
        /** @type {?} */
        var v1 = b.subtract(a);
        /** @type {?} */
        var v2 = p.subtract(a);
        // Compute dot products
        /** @type {?} */
        var dot00 = v0.dot(v0);
        /** @type {?} */
        var dot01 = v0.dot(v1);
        /** @type {?} */
        var dot02 = v0.dot(v2);
        /** @type {?} */
        var dot11 = v1.dot(v1);
        /** @type {?} */
        var dot12 = v1.dot(v2)
        // Compute barycentric coordinates
        ;
        // Compute barycentric coordinates
        /** @type {?} */
        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        /** @type {?} */
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        /** @type {?} */
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom
        // Check if point is in triangle
        ;
        // Check if point is in triangle
        return (u >= 0) && (v >= 0) && (u + v < 1);
    }
    var Vec2 = /** @class */ (function () {
        function Vec2(x, y) {
            this.x = x || 0.0;
            this.y = y || 0.0;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        Vec2.prototype.sub = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return new Vec2(this.x - v.x, this.y - v.y);
        };
        /**
         * @param {?} a
         * @param {?} b
         * @param {?} c
         * @param {?} p
         * @return {?}
         */
        Vec2.insideTri = /**
         * @param {?} a
         * @param {?} b
         * @param {?} c
         * @param {?} p
         * @return {?}
         */
        function (a, b, c, p) {
            return Vec2.cross(c.sub(b), p.sub(b)) >= .0 &&
                Vec2.cross(a.sub(c), p.sub(c)) >= .0 &&
                Vec2.cross(b.sub(a), p.sub(a)) >= .0;
        };
        ;
        /**
         * @param {?} v0
         * @param {?} v1
         * @return {?}
         */
        Vec2.cross = /**
         * @param {?} v0
         * @param {?} v1
         * @return {?}
         */
        function (v0, v1) {
            return v0.x * v1.y - v0.y * v1.x;
        };
        return Vec2;
    }());
    psgeometry.Vec2 = Vec2;
    if (false) {
        /** @type {?} */
        Vec2.prototype.x;
        /** @type {?} */
        Vec2.prototype.y;
        /* Skipping unhandled member: ;*/
    }
    var Polygon2D = /** @class */ (function () {
        function Polygon2D() {
            this.vertices = [];
        }
        Object.defineProperty(Polygon2D.prototype, "Vertices", {
            get: /**
             * @return {?}
             */
            function () {
                return this.vertices;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        Polygon2D.prototype.addVertex = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            this.vertices.push(new Vec2(x, y));
        };
        /**
         * @param {?} v
         * @return {?}
         */
        Polygon2D.prototype.addVector = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.vertices.push(v);
        };
        /**
         * @param {?} box
         * @return {?}
         */
        Polygon2D.prototype.addToAABB = /**
         * @param {?} box
         * @return {?}
         */
        function (box) {
            this.vertices.forEach(function (p) {
                box.addVector(p);
            });
        };
        /**
         * @return {?}
         */
        Polygon2D.prototype.clear = /**
         * @return {?}
         */
        function () {
            this.vertices.length = 0;
        };
        /**
         * @return {?}
         */
        Polygon2D.prototype.getArea = /**
         * @return {?}
         */
        function () {
            // see: https://stackoverflow.com/a/1165943
            /** @type {?} */
            var result = 0;
            /** @type {?} */
            var n = this.vertices.length;
            for (var i = n - 1, q = 0; q < n; i = q++) {
                result += this.vertices[i].x * this.vertices[q].y - this.vertices[q].x * this.vertices[i].y;
            }
            return result * 0.5;
        };
        /**
         * @private
         * @param {?} u
         * @param {?} v
         * @param {?} w
         * @param {?} n
         * @param {?} indices
         * @return {?}
         */
        Polygon2D.prototype.snip = /**
         * @private
         * @param {?} u
         * @param {?} v
         * @param {?} w
         * @param {?} n
         * @param {?} indices
         * @return {?}
         */
        function (u, v, w, n, indices) {
            /** @type {?} */
            var result;
            /** @type {?} */
            var a = this.vertices[indices[u]];
            /** @type {?} */
            var b = this.vertices[indices[v]];
            /** @type {?} */
            var c = this.vertices[indices[w]];
            /** @type {?} */
            var p;
            result = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > Polygon2D.Epsilon;
            for (var i = 0; i < n && result; ++i) {
                if ((i != u) && (i != v) && (i != w)) {
                    p = this.vertices[indices[i]];
                    result = !Vec2.insideTri(a, b, c, p);
                }
            }
            return result;
        };
        /**
         * @return {?}
         */
        Polygon2D.prototype.triangulate = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = new Polygon2D();
            /** @type {?} */
            var n = this.vertices.length;
            if (n > 2) {
                /** @type {?} */
                var indices = [];
                if (this.getArea() > .0) {
                    for (var i = 0; i < n; ++i)
                        indices[i] = i;
                }
                else {
                    for (var i = 0; i < n; ++i)
                        indices[i] = (n - 1) - i;
                }
                /** @type {?} */
                var nv = n;
                /*  remove nv-2 Vertices, creating 1 triangle every time */
                /** @type {?} */
                var count = 2 * nv;
                for (var m = 0, v = nv - 1; nv > 2;) {
                    /* if we loop, it is probably a non-simple polygon */
                    if (0 >= count--) {
                        return new Polygon2D();
                    }
                    /* three consecutive vertices in current polygon, <u,v,w> */
                    /** @type {?} */
                    var u = v;
                    if (nv <= u)
                        u = 0; /* previous */
                    v = u + 1;
                    if (nv <= v)
                        v = 0; /* new v    */
                    /* new v    */
                    /** @type {?} */
                    var w = v + 1;
                    if (nv <= w)
                        w = 0; /* next     */
                    if (this.snip(u, v, w, nv, indices)) {
                        /** @type {?} */
                        var a = void 0;
                        /** @type {?} */
                        var b = void 0;
                        /** @type {?} */
                        var c = void 0;
                        /** @type {?} */
                        var s = void 0;
                        /** @type {?} */
                        var t = void 0;
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
        };
        Polygon2D.Epsilon = 1e-10;
        return Polygon2D;
    }());
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
    var AABB2D = /** @class */ (function () {
        function AABB2D() {
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
        AABB2D.prototype.addPoint = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            this.minX = Math.min(this.minX, x);
            this.maxX = Math.max(this.maxX, x);
            this.minY = Math.min(this.minY, y);
            this.maxY = Math.max(this.maxY, y);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        AABB2D.prototype.addVector = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.addPoint(v.x, v.y);
        };
        /**
         * @param {?} box
         * @return {?}
         */
        AABB2D.prototype.addAABB = /**
         * @param {?} box
         * @return {?}
         */
        function (box) {
            this.addPoint(box.minX, box.minY);
            this.addPoint(box.maxX, box.maxY);
        };
        /**
         * @return {?}
         */
        AABB2D.prototype.clear = /**
         * @return {?}
         */
        function () {
            this.minX = +Infinity;
            this.maxX = -Infinity;
            this.minY = +Infinity;
            this.maxY = -Infinity;
        };
        /**
         * @return {?}
         */
        AABB2D.prototype.center = /**
         * @return {?}
         */
        function () {
            return new Vec2(.5 * (this.minX + this.maxX), .5 * (this.minY + this.maxY));
        };
        /**
         * @return {?}
         */
        AABB2D.prototype.extents = /**
         * @return {?}
         */
        function () {
            return new Vec2((this.maxX - this.minX), (this.maxY - this.minY));
        };
        /**
         * @return {?}
         */
        AABB2D.prototype.min = /**
         * @return {?}
         */
        function () {
            return new Vec2(this.minX, this.minY);
        };
        /**
         * @return {?}
         */
        AABB2D.prototype.max = /**
         * @return {?}
         */
        function () {
            return new Vec2(this.maxX, this.maxY);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        AABB2D.prototype.contains = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return v.x >= this.minX && v.x <= this.maxX &&
                v.y >= this.minY && v.y <= this.maxY;
        };
        return AABB2D;
    }());
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
    var /**
     * Represents a point in 3D space using spherical coordinates.
     */
    Spherical = /** @class */ (function () {
        function Spherical(r, azimuth, polar) {
            this.r = 0;
            this.azimuth = 0;
            this.polar = 0;
            this.r = r;
            this.azimuth = azimuth;
            this.polar = polar;
        }
        /** Converts cartesian coordinates x,y,z to spherical coordinates.
          */
        /**
         * Converts cartesian coordinates x,y,z to spherical coordinates.
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        Spherical.FromCartesian = /**
         * Converts cartesian coordinates x,y,z to spherical coordinates.
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (x, y, z) {
            /** @type {?} */
            var r = Math.sqrt(x * x + y * y + z * z);
            return new Spherical(r, Math.asin(y / r), Math.atan2(-x, z));
        };
        /** Converts cartesian vector to spherical coordinates.
          */
        /**
         * Converts cartesian vector to spherical coordinates.
         * @param {?} v
         * @return {?}
         */
        Spherical.FromCartesianVector = /**
         * Converts cartesian vector to spherical coordinates.
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return Spherical.FromCartesian(v.x, v.y, v.z);
        };
        /** Converts spherical coordinates to cartesian vector.
          */
        /**
         * Converts spherical coordinates to cartesian vector.
         * @param {?} r
         * @param {?} polar
         * @param {?} azimuth
         * @return {?}
         */
        Spherical.ToCartesian = /**
         * Converts spherical coordinates to cartesian vector.
         * @param {?} r
         * @param {?} polar
         * @param {?} azimuth
         * @return {?}
         */
        function (r, polar, azimuth) {
            return new Vec4(r * Math.cos(polar) * Math.sin(azimuth), -r * Math.sin(polar), -r * Math.cos(polar) * Math.cos(azimuth));
        };
        /** Converts spherical coordinates to cartesian vector.
          */
        /**
         * Converts spherical coordinates to cartesian vector.
         * @return {?}
         */
        Spherical.prototype.toCartesian = /**
         * Converts spherical coordinates to cartesian vector.
         * @return {?}
         */
        function () {
            return new Vec4(this.r * Math.cos(this.polar) * Math.sin(this.azimuth), -this.r * Math.sin(this.polar), -this.r * Math.cos(this.polar) * Math.cos(this.azimuth));
        };
        return Spherical;
    }());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHMtZ2VvbWV0cnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbW9kZWxzdGFnZS8iLCJzb3VyY2VzIjpbInNyYy9wcy1nZW9tZXRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBUSxVQUFVLENBdW5DdkI7QUF2bkNELFdBQWMsVUFBVTtJQUVwQjtRQStEQSxpQkFBWSxRQUFtQjtZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUM7Ozs7Ozs7UUE1RE0sdUJBQWU7Ozs7OztRQUF0QixVQUF1QixDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7O2dCQUNoRCxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7WUFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQzs7Ozs7OztRQUVNLG1CQUFXOzs7Ozs7UUFBbEIsVUFBbUIsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTOztnQkFDNUMsTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7Ozs7O1FBRU0scUJBQWE7Ozs7UUFBcEIsVUFBcUIsS0FBYTs7Z0JBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3RCLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7Ozs7O1FBRU0scUJBQWE7Ozs7UUFBcEIsVUFBcUIsS0FBYTs7Z0JBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3RCLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzNCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7Ozs7O1FBRU0scUJBQWE7Ozs7UUFBcEIsVUFBcUIsS0FBYTs7Z0JBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3RCLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7Ozs7Ozs7UUFFTSxvQkFBWTs7Ozs7O1FBQW5CLFVBQW9CLEtBQWEsRUFBRSxHQUFXLEVBQUUsSUFBWTtZQUMxRCxPQUFPLElBQUksT0FBTyxDQUFDO2dCQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNyRixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN6TSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN6TSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQUMsQ0FDWixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLENBQUM7Ozs7OztRQU1ELG1CQUFDOzs7OztRQUFELFVBQUUsTUFBYyxFQUFFLE1BQWM7O2dCQUMxQixHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENB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QUFJLENBQUMsWUFBWSxPQUFPLEVBQUU7O29CQUNwQixDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVE7O29CQUNqQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVE7Z0JBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDekQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBRXpELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENB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Q0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FB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QUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxDQUFDOzs7O1FBRUQscUJBQU07OztRQUFOO1lBQ0UsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7Ozs7UUFFRCxxQkFBTTs7O1FBQU47WUFDRSxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7Ozs7O1FBRUQsa0JBQUc7Ozs7UUFBSCxVQUFJLEdBQVM7WUFDWCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7Ozs7O1FBRUQsa0JBQUc7Ozs7UUFBSCxVQUFJLEdBQVM7WUFDWCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7Ozs7O1FBRUQsa0JBQUc7Ozs7UUFBSCxVQUFJLEdBQVM7WUFDWCxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENB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QUFHLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNoRixLQUFLLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2dCQUUvRSxRQUFRLEdBQUcsUUFBUTtZQUN2QixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFBRTtZQUN4RixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxFQUFFO2dCQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFBRTtZQUM1SCxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxFQUFFO2dCQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFBRTtZQUM1SCxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxD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Q0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQzlCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxnQkFBQztJQUFELENBQUMsQUE1Q0gsSUE0Q0c7SUE1Q1Usb0JBQVMsWUE0Q25CLENBQUE7OztRQTFDRCxzQkFBYTs7UUFDYiw0QkFBbUI7O1FBQ25CLDBCQUFpQjs7QUF5Q3JCLENBQUMsRUF2bkNhLFVBQVUsS0FBVixVQUFVLFFBdW5DdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5leHBvcnQgbW9kdWxlIHBzZ2VvbWV0cnkge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRyaXg0IHtcclxuICAgIGVsZW1lbnRzOiBudW1iZXJbXTtcclxuXHJcbiAgICBzdGF0aWMgSWRlbnRpdHkgPSBuZXcgTWF0cml4NCgpO1xyXG5cclxuICAgIHN0YXRpYyBGcm9tVHJhbnNsYXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeDQoKTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzNdID0geDtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzddID0geTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzExXSA9IHo7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIEZyb21TY2FsaW5nKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXRyaXg0KCk7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1swXSA9IHg7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1s1XSA9IHk7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1sxMF0gPSB6O1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgc3RhdGljIEZyb21Sb3RhdGlvblgoYW5nbGU6IG51bWJlcikge1xyXG4gICAgICBsZXQgY29zQSA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgbGV0IHNpbkEgPSBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4NCgpO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbNV0gPSBjb3NBO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbNl0gPSAtc2luQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzldID0gc2luQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzEwXSA9IGNvc0E7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBGcm9tUm90YXRpb25ZKGFuZ2xlOiBudW1iZXIpIHtcclxuICAgICAgbGV0IGNvc0EgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgIGxldCBzaW5BID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hdHJpeDQoKTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzBdID0gY29zQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzJdID0gc2luQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzhdID0gLXNpbkE7XHJcbiAgICAgIHJlc3VsdC5lbGVtZW50c1sxMF0gPSBjb3NBO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgc3RhdGljIEZyb21Sb3RhdGlvblooYW5nbGU6IG51bWJlcikge1xyXG4gICAgICBsZXQgY29zQSA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgbGV0IHNpbkEgPSBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBuZXcgTWF0cml4NCgpO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbMF0gPSBjb3NBO1xyXG4gICAgICByZXN1bHQuZWxlbWVudHNbMV0gPSAtc2luQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzRdID0gc2luQTtcclxuICAgICAgcmVzdWx0LmVsZW1lbnRzWzVdID0gY29zQTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgRnJvbVJvdGF0aW9uKHBpdGNoOiBudW1iZXIsIHlhdzogbnVtYmVyLCByb2xsOiBudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KFtcclxuICAgICAgICBNYXRoLmNvcyh5YXcpICogTWF0aC5jb3MocGl0Y2gpLCBNYXRoLnNpbih5YXcpICogTWF0aC5jb3MocGl0Y2gpLCAtTWF0aC5zaW4ocGl0Y2gpLCAwLFxyXG4gICAgICAgIE1hdGguY29zKHlhdykgKiBNYXRoLnNpbihwaXRjaCkgKiBNYXRoLnNpbihyb2xsKSAtIE1hdGguc2luKHlhdykgKiBNYXRoLmNvcyhyb2xsKSwgTWF0aC5zaW4oeWF3KSAqIE1hdGguc2luKHBpdGNoKSAqIE1hdGguc2luKHJvbGwpICsgTWF0aC5jb3MoeWF3KSAqIE1hdGguY29zKHJvbGwpLCBNYXRoLmNvcyhwaXRjaCkgKiBNYXRoLnNpbihyb2xsKSwgMCxcclxuICAgICAgICBNYXRoLmNvcyh5YXcpICogTWF0aC5zaW4ocGl0Y2gpICogTWF0aC5jb3Mocm9sbCkgKyBNYXRoLnNpbih5YXcpICogTWF0aC5zaW4ocm9sbCksIE1hdGguc2luKHlhdykgKiBNYXRoLnNpbihwaXRjaCkgKiBNYXRoLmNvcyhyb2xsKSAtIE1hdGguY29zKHlhdykgKiBNYXRoLnNpbihyb2xsKSwgTWF0aC5jb3MocGl0Y2gpICogTWF0aC5jb3Mocm9sbCksIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMV1cclxuICAgICAgKS50cmFuc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50cz86IG51bWJlcltdKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cyB8fCBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9XHJcblxyXG4gICAgZShjb2xJZHg6IG51bWJlciwgcm93SWR4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICBsZXQgaWR4ID0gY29sSWR4ICsgKHJvd0lkeCB8fCAwKSAqIDQ7XHJcbiAgICAgIHJldHVybiBpZHggPj0gMCAmJiBpZHggPCAxNiA/IHRoaXMuZWxlbWVudHNbaWR4XSA6IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHJvdyhpZHg6IG51bWJlcik6IFZlYzQge1xyXG4gICAgICBpZiAoaWR4ID49IDAgJiYgaWR4IDwgNCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLmVsZW1lbnRzW2lkeCAqIDRdLCB0aGlzLmVsZW1lbnRzW2lkeCAqIDQgKyAxXSwgdGhpcy5lbGVtZW50c1tpZHggKiA0ICsgMl0sIHRoaXMuZWxlbWVudHNbaWR4ICogNCArIDNdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb2woaWR4OiBudW1iZXIpOiBWZWM0IHtcclxuICAgICAgaWYgKGlkeCA8PSAwICYmIGlkeCA8IDQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzQodGhpcy5lbGVtZW50c1tpZHhdLCB0aGlzLmVsZW1lbnRzW2lkeCArIDRdLCB0aGlzLmVsZW1lbnRzW2lkeCArIDhdLCB0aGlzLmVsZW1lbnRzW2lkeCArIDEyXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlcXVhbHMobTogTWF0cml4NCkge1xyXG4gICAgICBpZiAobSkge1xyXG4gICAgICAgIGxldCBsID0gdGhpcy5lbGVtZW50cztcclxuICAgICAgICBsZXQgciA9IG0uZWxlbWVudHM7XHJcblxyXG4gICAgICAgIHJldHVybiBsWzBdID09IHJbMF0gJiYgbFsxXSA9PSByWzFdICYmIGxbMl0gPT0gclsyXSAmJiBsWzNdID09IHJbM10gJiZcclxuICAgICAgICAgIGxbNF0gPT0gcls0XSAmJiBsWzVdID09IHJbNV0gJiYgbFs2XSA9PSByWzZdICYmIGxbN10gPT0gcls3XSAmJlxyXG4gICAgICAgICAgbFs4XSA9PSByWzhdICYmIGxbOV0gPT0gcls5XSAmJiBsWzEwXSA9PSByWzEwXSAmJiBsWzExXSA9PSByWzExXSAmJlxyXG4gICAgICAgICAgbFsxMl0gPT0gclsxMl0gJiYgbFsxM10gPT0gclsxM10gJiYgbFsxNF0gPT0gclsxNF0gJiYgbFsxNV0gPT0gclsxNV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG06IE1hdHJpeDQgfCBWZWM0IHwgbnVtYmVyKTogTWF0cml4NCB8IFZlYzQge1xyXG4gICAgICBpZiAobSBpbnN0YW5jZW9mIE1hdHJpeDQpIHtcclxuICAgICAgICBsZXQgbCA9IHRoaXMuZWxlbWVudHM7XHJcbiAgICAgICAgbGV0IHIgPSBtLmVsZW1lbnRzO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NChbXHJcbiAgICAgICAgICBsWzBdICogclswXSArIGxbNF0gKiByWzFdICsgbFs4XSAqIHJbMl0gKyBsWzEyXSAqIHJbM10sXHJcbiAgICAgICAgICBsWzFdICogclswXSArIGxbNV0gKiByWzFdICsgbFs5XSAqIHJbMl0gKyBsWzEzXSAqIHJbM10sXHJcbiAgICAgICAgICBsWzJdICogclswXSArIGxbNl0gKiByWzFdICsgbFsxMF0gKiByWzJdICsgbFsxNF0gKiByWzNdLFxyXG4gICAgICAgICAgbFszXSAqIHJbMF0gKyBsWzddICogclsxXSArIGxbMTFdICogclsyXSArIGxbMTVdICogclszXSxcclxuXHJcbiAgICAgICAgICBsWzBdICogcls0XSArIGxbNF0gKiByWzVdICsgbFs4XSAqIHJbNl0gKyBsWzEyXSAqIHJbN10sXHJcbiAgICAgICAgICBsWzFdICogcls0XSArIGxbNV0gKiByWzVdICsgbFs5XSAqIHJbNl0gKyBsWzEzXSAqIHJbN10sXHJcbiAgICAgICAgICBsWzJdICogcls0XSArIGxbNl0gKiByWzVdICsgbFsxMF0gKiByWzZdICsgbFsxNF0gKiByWzddLFxyXG4gICAgICAgICAgbFszXSAqIHJbNF0gKyBsWzddICogcls1XSArIGxbMTFdICogcls2XSArIGxbMTVdICogcls3XSxcclxuXHJcbiAgICAgICAgICBsWzBdICogcls4XSArIGxbNF0gKiByWzldICsgbFs4XSAqIHJbMTBdICsgbFsxMl0gKiByWzExXSxcclxuICAgICAgICAgIGxbMV0gKiByWzhdICsgbFs1XSAqIHJbOV0gKyBsWzldICogclsxMF0gKyBsWzEzXSAqIHJbMTFdLFxyXG4gICAgICAgICAgbFsyXSAqIHJbOF0gKyBsWzZdICogcls5XSArIGxbMTBdICogclsxMF0gKyBsWzE0XSAqIHJbMTFdLFxyXG4gICAgICAgICAgbFszXSAqIHJbOF0gKyBsWzddICogcls5XSArIGxbMTFdICogclsxMF0gKyBsWzE1XSAqIHJbMTFdLFxyXG5cclxuICAgICAgICAgIGxbMF0gKiByWzEyXSArIGxbNF0gKiByWzEzXSArIGxbOF0gKiByWzE0XSArIGxbMTJdICogclsxNV0sXHJcbiAgICAgICAgICBsWzFdICogclsxMl0gKyBsWzVdICogclsxM10gKyBsWzldICogclsxNF0gKyBsWzEzXSAqIHJbMTVdLFxyXG4gICAgICAgICAgbFsyXSAqIHJbMTJdICsgbFs2XSAqIHJbMTNdICsgbFsxMF0gKiByWzE0XSArIGxbMTRdICogclsxNV0sXHJcbiAgICAgICAgICBsWzNdICogclsxMl0gKyBsWzddICogclsxM10gKyBsWzExXSAqIHJbMTRdICsgbFsxNV0gKiByWzE1XVxyXG4gICAgICAgIF0pO1xyXG4gICAgICB9IGVsc2UgaWYgKG0gaW5zdGFuY2VvZiBWZWM0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWM0KFxyXG4gICAgICAgICAgbS54ICogdGhpcy5lbGVtZW50c1swXSArIG0ueSAqIHRoaXMuZWxlbWVudHNbMV0gKyBtLnogKiB0aGlzLmVsZW1lbnRzWzJdICsgbS53ICogdGhpcy5lbGVtZW50c1szXSxcclxuICAgICAgICAgIG0ueCAqIHRoaXMuZWxlbWVudHNbNF0gKyBtLnkgKiB0aGlzLmVsZW1lbnRzWzVdICsgbS56ICogdGhpcy5lbGVtZW50c1s2XSArIG0udyAqIHRoaXMuZWxlbWVudHNbN10sXHJcbiAgICAgICAgICBtLnggKiB0aGlzLmVsZW1lbnRzWzhdICsgbS55ICogdGhpcy5lbGVtZW50c1s5XSArIG0ueiAqIHRoaXMuZWxlbWVudHNbMTBdICsgbS53ICogdGhpcy5lbGVtZW50c1sxMV0sXHJcbiAgICAgICAgICBtLnggKiB0aGlzLmVsZW1lbnRzWzEyXSArIG0ueSAqIHRoaXMuZWxlbWVudHNbMTNdICsgbS56ICogdGhpcy5lbGVtZW50c1sxNF0gKyBtLncgKiB0aGlzLmVsZW1lbnRzWzE1XSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KHRoaXMuZWxlbWVudHMubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICogPG51bWJlcj5tOyB9KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b1JpZ2h0VHJpYW5ndWxhcigpOiBNYXRyaXg0IHtcclxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KE1hdHJpeC50b1JpZ2h0VHJpYW5ndWxhcih0aGlzLmVsZW1lbnRzLCA0LCA0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGV0ZXJtaW5hbnQoKTogbnVtYmVyIHtcclxuICAgICAgbGV0IG0gPSB0aGlzLnRvUmlnaHRUcmlhbmd1bGFyKCk7XHJcbiAgICAgIHJldHVybiBtLmVsZW1lbnRzWzBdICogbS5lbGVtZW50c1s1XSAqIG0uZWxlbWVudHNbMTBdICogbS5lbGVtZW50c1sxNV07XHJcbiAgICB9XHJcblxyXG4gICAgaXNTaW5ndWxhcigpOiBib29sZWFuIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGV0ZXJtaW5hbnQoKSA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc3Bvc2UoKTogTWF0cml4NCB7XHJcbiAgICAgIGxldCBlID0gdGhpcy5lbGVtZW50cztcclxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KFtcclxuICAgICAgICBlWzBdLCBlWzRdLCBlWzhdLCBlWzEyXSxcclxuICAgICAgICBlWzFdLCBlWzVdLCBlWzldLCBlWzEzXSxcclxuICAgICAgICBlWzJdLCBlWzZdLCBlWzEwXSwgZVsxNF0sXHJcbiAgICAgICAgZVszXSwgZVs3XSwgZVsxMV0sIGVbMTVdXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGludmVyc2UoKTogTWF0cml4NCB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Npbmd1bGFyKCkpIHtcclxuICAgICAgICBsZXQgYXVnbWVudGVkTWF0cml4ID0gW1xyXG4gICAgICAgICAgdGhpcy5lbGVtZW50c1swXSwgdGhpcy5lbGVtZW50c1sxXSwgdGhpcy5lbGVtZW50c1syXSwgdGhpcy5lbGVtZW50c1szXSwgMSwgMCwgMCwgMCxcclxuICAgICAgICAgIHRoaXMuZWxlbWVudHNbNF0sIHRoaXMuZWxlbWVudHNbNV0sIHRoaXMuZWxlbWVudHNbNl0sIHRoaXMuZWxlbWVudHNbN10sIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzWzhdLCB0aGlzLmVsZW1lbnRzWzldLCB0aGlzLmVsZW1lbnRzWzEwXSwgdGhpcy5lbGVtZW50c1sxMV0sIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzWzEyXSwgdGhpcy5lbGVtZW50c1sxM10sIHRoaXMuZWxlbWVudHNbMTRdLCB0aGlzLmVsZW1lbnRzWzE1XSwgMCwgMCwgMCwgMVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBtID0gTWF0cml4LnRvUmlnaHRUcmlhbmd1bGFyKGF1Z21lbnRlZE1hdHJpeCwgNCwgOCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDM7IHJvdyA+PSAwOyByb3ctLSkge1xyXG4gICAgICAgICAgbGV0IGRpdmlzb3IgPSBtW3JvdyAqIDldO1xyXG4gICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgODsgY29sKyspIHtcclxuICAgICAgICAgICAgbVtyb3cgKiA4ICsgY29sXSA9IG1bcm93ICogOCArIGNvbF0gLyBkaXZpc29yO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGFsdHJvdyA9IHJvdyAtIDE7IGFsdHJvdyA+PSAwOyBhbHRyb3ctLSkge1xyXG4gICAgICAgICAgICBsZXQgbXVsdGlwbGllciA9IG1bYWx0cm93ICogOCArIHJvd107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDg7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgICAgbVthbHRyb3cgKiA4ICsgY29sXSA9IG1bYWx0cm93ICogOCArIGNvbF0gLSBtW3JvdyAqIDggKyBjb2xdICogbXVsdGlwbGllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDQoW1xyXG4gICAgICAgICAgbVs0XSwgbVs1XSwgbVs2XSwgbVs3XSxcclxuICAgICAgICAgIG1bMTJdLCBtWzEzXSwgbVsxNF0sIG1bMTVdLFxyXG4gICAgICAgICAgbVsyMF0sIG1bMjFdLCBtWzIyXSwgbVsyM10sXHJcbiAgICAgICAgICBtWzI4XSwgbVsyOV0sIG1bMzBdLCBtWzMxXVxyXG4gICAgICAgIF0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZXhwb3J0IGNsYXNzIE1hdHJpeDMge1xyXG4gICAgZWxlbWVudHM6IG51bWJlcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzPzogbnVtYmVyW10pIHtcclxuICAgICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzIHx8IFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgSWRlbnRpdHkgPSBuZXcgTWF0cml4MygpO1xyXG5cclxuICAgIGUoY29sSWR4OiBudW1iZXIsIHJvd0lkeDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgbGV0IGlkeCA9IGNvbElkeCArIChyb3dJZHggfHwgMCkgKiAzO1xyXG4gICAgICByZXR1cm4gaWR4ID49IDAgJiYgaWR4IDwgOSA/IHRoaXMuZWxlbWVudHNbaWR4XSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcm93KGlkeDogbnVtYmVyKTogVmVjMyB7XHJcbiAgICAgIGlmIChpZHggPj0gMCAmJiBpZHggPCAzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMuZWxlbWVudHNbaWR4ICogM10sIHRoaXMuZWxlbWVudHNbaWR4ICogMyArIDFdLCB0aGlzLmVsZW1lbnRzW2lkeCAqIDMgKyAyXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb2woaWR4OiBudW1iZXIpOiBWZWMzIHtcclxuICAgICAgaWYgKGlkeCA8PSAwICYmIGlkeCA8IDMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzModGhpcy5lbGVtZW50c1tpZHhdLCB0aGlzLmVsZW1lbnRzW2lkeCArIDNdLCB0aGlzLmVsZW1lbnRzW2lkeCArIDZdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KG06IE1hdHJpeDMgfCBWZWMzIHwgbnVtYmVyKTogTWF0cml4MyB8IFZlYzMge1xyXG4gICAgICBpZiAobSBpbnN0YW5jZW9mIE1hdHJpeDMpIHtcclxuICAgICAgICBsZXQgbCA9IHRoaXMuZWxlbWVudHM7XHJcbiAgICAgICAgbGV0IHIgPSBtLmVsZW1lbnRzO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4MyhbXHJcbiAgICAgICAgICBsWzBdICogclswXSArIGxbM10gKiByWzFdICsgbFs2XSAqIHJbMl0sXHJcbiAgICAgICAgICBsWzFdICogclswXSArIGxbNF0gKiByWzFdICsgbFs3XSAqIHJbMl0sXHJcbiAgICAgICAgICBsWzJdICogclswXSArIGxbNV0gKiByWzFdICsgbFs4XSAqIHJbMl0sXHJcblxyXG4gICAgICAgICAgbFswXSAqIHJbM10gKyBsWzNdICogcls0XSArIGxbNl0gKiByWzVdLFxyXG4gICAgICAgICAgbFsxXSAqIHJbM10gKyBsWzRdICogcls0XSArIGxbN10gKiByWzVdLFxyXG4gICAgICAgICAgbFsyXSAqIHJbM10gKyBsWzVdICogcls0XSArIGxbOF0gKiByWzVdLFxyXG5cclxuICAgICAgICAgIGxbMF0gKiByWzZdICsgbFszXSAqIHJbN10gKyBsWzZdICogcls4XSxcclxuICAgICAgICAgIGxbMV0gKiByWzZdICsgbFs0XSAqIHJbN10gKyBsWzddICogcls4XSxcclxuICAgICAgICAgIGxbMl0gKiByWzZdICsgbFs1XSAqIHJbN10gKyBsWzhdICogcls4XVxyXG4gICAgICAgIF0pO1xyXG4gICAgICB9IGVsc2UgaWYgKG0gaW5zdGFuY2VvZiBWZWMzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMzKFxyXG4gICAgICAgICAgbS54ICogdGhpcy5lbGVtZW50c1swXSArIG0ueSAqIHRoaXMuZWxlbWVudHNbMV0gKyBtLnogKiB0aGlzLmVsZW1lbnRzWzJdLFxyXG4gICAgICAgICAgbS54ICogdGhpcy5lbGVtZW50c1szXSArIG0ueSAqIHRoaXMuZWxlbWVudHNbNF0gKyBtLnogKiB0aGlzLmVsZW1lbnRzWzVdLFxyXG4gICAgICAgICAgbS54ICogdGhpcy5lbGVtZW50c1s2XSArIG0ueSAqIHRoaXMuZWxlbWVudHNbN10gKyBtLnogKiB0aGlzLmVsZW1lbnRzWzhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDModGhpcy5lbGVtZW50cy5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgKiA8bnVtYmVyPm07IH0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvUmlnaHRUcmlhbmd1bGFyKCk6IE1hdHJpeDMge1xyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDMoTWF0cml4LnRvUmlnaHRUcmlhbmd1bGFyKHRoaXMuZWxlbWVudHMsIDMsIDMpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRlcm1pbmFudCgpOiBudW1iZXIge1xyXG4gICAgICBsZXQgbSA9IHRoaXMudG9SaWdodFRyaWFuZ3VsYXIoKTtcclxuICAgICAgcmV0dXJuIG0uZWxlbWVudHNbMF0gKiBtLmVsZW1lbnRzWzRdICogbS5lbGVtZW50c1s4XTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Npbmd1bGFyKCk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5kZXRlcm1pbmFudCgpID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zcG9zZSgpOiBNYXRyaXgzIHtcclxuICAgICAgbGV0IGUgPSB0aGlzLmVsZW1lbnRzO1xyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDMoW1xyXG4gICAgICAgIGVbMF0sIGVbM10sIGVbNl0sXHJcbiAgICAgICAgZVsxXSwgZVs0XSwgZVs3XSxcclxuICAgICAgICBlWzJdLCBlWzVdLCBlWzhdXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGludmVyc2UoKTogTWF0cml4MyB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Npbmd1bGFyKCkpIHtcclxuICAgICAgICBsZXQgYXVnbWVudGVkTWF0cml4ID0gW1xyXG4gICAgICAgICAgdGhpcy5lbGVtZW50c1swXSwgdGhpcy5lbGVtZW50c1sxXSwgdGhpcy5lbGVtZW50c1syXSwgMSwgMCwgMCxcclxuICAgICAgICAgIHRoaXMuZWxlbWVudHNbM10sIHRoaXMuZWxlbWVudHNbNF0sIHRoaXMuZWxlbWVudHNbNV0sIDAsIDEsIDAsXHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzWzZdLCB0aGlzLmVsZW1lbnRzWzddLCB0aGlzLmVsZW1lbnRzWzhdLCAwLCAwLCAxLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBtID0gTWF0cml4LnRvUmlnaHRUcmlhbmd1bGFyKGF1Z21lbnRlZE1hdHJpeCwgMywgNik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDI7IHJvdyA+PSAwOyByb3ctLSkge1xyXG4gICAgICAgICAgbGV0IGRpdmlzb3IgPSBtW3JvdyAqIDddO1xyXG4gICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNjsgY29sKyspIHtcclxuICAgICAgICAgICAgbVtyb3cgKiA3ICsgY29sXSA9IG1bcm93ICogNyArIGNvbF0gLyBkaXZpc29yO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGFsdHJvdyA9IHJvdyAtIDE7IGFsdHJvdyA+PSAwOyBhbHRyb3ctLSkge1xyXG4gICAgICAgICAgICBsZXQgbXVsdGlwbGllciA9IG1bYWx0cm93ICogNiArIHJvd107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDY7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgICAgbVthbHRyb3cgKiA2ICsgY29sXSA9IG1bYWx0cm93ICogNiArIGNvbF0gLSBtW3JvdyAqIDYgKyBjb2xdICogbXVsdGlwbGllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDMoW1xyXG4gICAgICAgICAgbVszXSwgbVs0XSwgbVs1XSxcclxuICAgICAgICAgIG1bOV0sIG1bMTBdLCBtWzExXSxcclxuICAgICAgICAgIG1bMTVdLCBtWzE2XSwgbVsxN11cclxuICAgICAgICBdKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIE1hdHJpeCB7XHJcbiAgICBzdGF0aWMgdG9SaWdodFRyaWFuZ3VsYXIoZWxlbWVudHMsIHJvd3MsIGNvbHMpIHtcclxuICAgICAgbGV0IG0gPSBlbGVtZW50cy5zbGljZSgwKTtcclxuXHJcbiAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XHJcbiAgICAgICAgaWYgKG1bcm93ICogKGNvbHMgKyAxKV0gPT0gMCkge1xyXG4gICAgICAgICAgZm9yIChsZXQgYWx0cm93ID0gcm93ICsgMTsgYWx0cm93IDwgcm93czsgYWx0cm93KyspIHtcclxuICAgICAgICAgICAgaWYgKG1bYWx0cm93ICogY29scyArIHJvd10gIT0gMCkge1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtW3JvdyAqIGNvbHMgKyBqXSArPSBtW2FsdHJvdyAqIGNvbHMgKyBqXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtW3JvdyAqIChjb2xzICsgMSldICE9IDApIHtcclxuICAgICAgICAgIGZvciAobGV0IGFsdHJvdyA9IHJvdyArIDE7IGFsdHJvdyA8IHJvd3M7IGFsdHJvdysrKSB7XHJcbiAgICAgICAgICAgIGxldCBtdWx0aXBsaWVyID0gbVthbHRyb3cgKiBjb2xzICsgcm93XSAvIG1bcm93ICogKGNvbHMgKyAxKV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgbVthbHRyb3cgKiBjb2xzICsgal0gPSBqIDwgcm93ID8gMCA6IG1bYWx0cm93ICogY29scyArIGpdIC0gbVtyb3cgKiBjb2xzICsgal0gKiBtdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFZlYzMge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgejogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/LCB5Pywgej8pIHtcclxuICAgICAgdGhpcy54ID0geCB8fCAwLjA7XHJcbiAgICAgIHRoaXMueSA9IHkgfHwgMC4wO1xyXG4gICAgICB0aGlzLnogPSB6IHx8IDAuMDtcclxuICAgIH1cclxuXHJcbiAgICBhc1ZlYzMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjNCh3PzogbnVtYmVyKTogVmVjNCB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB3IHx8IDEuMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXF1YWxzKHY6IFZlYzMpOiBib29sZWFuIHtcclxuICAgICAgcmV0dXJuIHRoaXMueCA9PSB2LnggJiYgdGhpcy55ID09IHYueSAmJiB0aGlzLnogPT0gdi56O1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnblBvaW50KHgsIHksIHopIHtcclxuICAgICAgdGhpcy54ID0geDtcclxuICAgICAgdGhpcy55ID0geTtcclxuICAgICAgdGhpcy56ID0gejtcclxuICAgIH1cclxuXHJcbiAgICBhc3NpZ25WZWModjogVmVjMyB8IFZlYzQpIHtcclxuICAgICAgdGhpcy54ID0gdi54O1xyXG4gICAgICB0aGlzLnkgPSB2Lnk7XHJcbiAgICAgIHRoaXMueiA9IHYuejtcclxuICAgIH1cclxuXHJcbiAgICBhZGQodmVjOiBWZWMzIHwgVmVjNCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzModGhpcy54ICsgdmVjLngsIHRoaXMueSArIHZlYy55LCB0aGlzLnogKyB2ZWMueik7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViKHZlYzogVmVjMyB8IFZlYzQpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMueCAtIHZlYy54LCB0aGlzLnkgLSB2ZWMueSwgdGhpcy56IC0gdmVjLnopO1xyXG4gICAgfVxyXG5cclxuICAgIGRvdCh2ZWM6IFZlYzMgfCBWZWM0KTogbnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnkgKyB0aGlzLnogKiB2ZWMuejtcclxuICAgIH1cclxuXHJcbiAgICBjcm9zcyh2OiBWZWMzIHwgVmVjNCkge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgICAgKHRoaXMueSAqIHYueikgLSAodGhpcy56ICogdi55KSxcclxuICAgICAgICAodGhpcy56ICogdi54KSAtICh0aGlzLnggKiB2LnopLFxyXG4gICAgICAgICh0aGlzLnggKiB2LnkpIC0gKHRoaXMueSAqIHYueClcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShzOiBudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMueCAqIHMsIHRoaXMueSAqIHMsIHRoaXMueiAqIHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5UXVhdGVybmlvbihxOiBRdWF0ZXJuaW9uKSB7XHJcbiAgICAgIGxldCB4ID0gdGhpcy54O1xyXG4gICAgICBsZXQgeSA9IHRoaXMueTtcclxuICAgICAgbGV0IHogPSB0aGlzLno7XHJcblxyXG4gICAgICBsZXQgcXggPSBxLng7XHJcbiAgICAgIGxldCBxeSA9IHEueTtcclxuICAgICAgbGV0IHF6ID0gcS56O1xyXG4gICAgICBsZXQgcXcgPSBxLnc7XHJcblxyXG4gICAgICAvLyBxdWF0ZXJuaW9uICogdmVjdG9yXHJcbiAgICAgIGxldCBweCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeTtcclxuICAgICAgbGV0IHB5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xyXG4gICAgICBsZXQgcHogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHg7XHJcbiAgICAgIGxldCBwdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XHJcblxyXG4gICAgICAvLyBwcm9kdWN0ICogaW52ZXJzZSBxdWF0ZXJuaW9uXHJcbiAgICAgIHRoaXMueCA9IHB4ICogcXcgLSBwdyAqIHF4IC0gcHkgKiBxeiArIHB6ICogcXk7XHJcbiAgICAgIHRoaXMueSA9IHB5ICogcXcgLSBwdyAqIHF5IC0gcHogKiBxeCArIHB4ICogcXo7XHJcbiAgICAgIHRoaXMueiA9IHB6ICogcXcgLSBwdyAqIHF6IC0gcHggKiBxeSArIHB5ICogcXg7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBub3JtKCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueik7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsaXplKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBseSgxIC8gdGhpcy5ub3JtKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRzKCkge1xyXG4gICAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnpdO1xyXG4gICAgfVxyXG5cclxuICAgIHNxdWFyZWREaXN0KHY6IFZlYzMgfCBWZWM0KSB7XHJcbiAgICAgIHJldHVybiAodGhpcy54IC0gdi54KSAqICh0aGlzLnggLSB2LngpICtcclxuICAgICAgICAodGhpcy55IC0gdi55KSAqICh0aGlzLnkgLSB2LnkpICtcclxuICAgICAgICAodGhpcy56IC0gdi56KSAqICh0aGlzLnogLSB2LnopO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFZlYzQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgejogbnVtYmVyO1xyXG4gICAgdzogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgWmVybyA9IG5ldyBWZWM0KDAuMCwgMC4wLCAwLjAsIDAuMCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBPbmUgPSBuZXcgVmVjNCgxLjAsIDEuMCwgMS4wLCAxLjApO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/LCB5Pywgej8sIHc/KSB7XHJcbiAgICAgIHRoaXMueCA9IHggfHwgMC4wO1xyXG4gICAgICB0aGlzLnkgPSB5IHx8IDAuMDtcclxuICAgICAgdGhpcy56ID0geiB8fCAwLjA7XHJcbiAgICAgIHRoaXMudyA9IHcgfHwgMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIGVxdWFscyh2OiBWZWM0KTogYm9vbGVhbiB7XHJcbiAgICAgIHJldHVybiB0aGlzLnggPT0gdi54ICYmIHRoaXMueSA9PSB2LnkgJiYgdGhpcy56ID09IHYueiAmJiB0aGlzLncgPT0gdi53O1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjMygpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjNCgpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHZlYzogVmVjNCk6IFZlYzQge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzQodGhpcy54ICsgdmVjLngsIHRoaXMueSArIHZlYy55LCB0aGlzLnogKyB2ZWMueiwgdGhpcy53ICsgdmVjLncpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Yih2ZWM6IFZlYzQpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWM0KHRoaXMueCAtIHZlYy54LCB0aGlzLnkgLSB2ZWMueSwgdGhpcy56IC0gdmVjLnosIHRoaXMudyAtIHZlYy53KTtcclxuICAgIH1cclxuXHJcbiAgICBkb3QodmVjOiBWZWM0KTogbnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnkgKyB0aGlzLnogKiB2ZWMueiArIHRoaXMudyAqIHZlYy53O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKHY6IFZlYzQpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWM0KFxyXG4gICAgICAgICh0aGlzLnkgKiB2LnopIC0gKHRoaXMueiAqIHYueSksXHJcbiAgICAgICAgKHRoaXMueiAqIHYueCkgLSAodGhpcy54ICogdi56KSxcclxuICAgICAgICAodGhpcy54ICogdi55KSAtICh0aGlzLnkgKiB2LngpLFxyXG4gICAgICAgIDEuMFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG11bHRpcGx5KHM6IG51bWJlcik6IFZlYzQge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzQodGhpcy54ICogcywgdGhpcy55ICogcywgdGhpcy56ICogcywgdGhpcy53ICogcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybSgpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueiArIHRoaXMudyAqIHRoaXMudyk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsaXplKCk6IFZlYzQge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBseSgxIC8gdGhpcy5ub3JtKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRzKCk6IG51bWJlcltdIHtcclxuICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLnddO1xyXG4gICAgfVxyXG5cclxuICAgIHNxdWFyZWREaXN0KHY6IFZlYzQpIHtcclxuICAgICAgcmV0dXJuICh0aGlzLnggLSB2LngpICogKHRoaXMueCAtIHYueCkgK1xyXG4gICAgICAgICh0aGlzLnkgLSB2LnkpICogKHRoaXMueSAtIHYueSkgK1xyXG4gICAgICAgICh0aGlzLnogLSB2LnopICogKHRoaXMueiAtIHYueikgK1xyXG4gICAgICAgICh0aGlzLncgLSB2LncpICogKHRoaXMudyAtIHYudyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgUXVhdGVybmlvbiB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB6OiBudW1iZXI7XHJcbiAgICB3OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xyXG4gICAgICB0aGlzLnggPSB4IHx8IDAuMDtcclxuICAgICAgdGhpcy55ID0geSB8fCAwLjA7XHJcbiAgICAgIHRoaXMueiA9IHogfHwgMC4wO1xyXG4gICAgICB0aGlzLncgPSB0eXBlb2YgdyA9PSAndW5kZWZpbmVkJyA/IDEuMCA6IHc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RnJvbUF4aXNBbmdsZShheGlzOiBWZWMzLCBhbmdsZTogbnVtYmVyKTogUXVhdGVybmlvbiB7XHJcbiAgICAgIGxldCBoYWxmQW5nbGUgPSBhbmdsZSAvIDI7XHJcbiAgICAgIGxldCBzID0gTWF0aC5zaW4oaGFsZkFuZ2xlKTtcclxuXHJcbiAgICAgIHRoaXMueCA9IGF4aXMueCAqIHM7XHJcbiAgICAgIHRoaXMueSA9IGF4aXMueSAqIHM7XHJcbiAgICAgIHRoaXMueiA9IGF4aXMueiAqIHM7XHJcbiAgICAgIHRoaXMudyA9IE1hdGguY29zKGhhbGZBbmdsZSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXBseShxOiBRdWF0ZXJuaW9uKSB7XHJcbiAgICAgIGxldCB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56LCB3ID0gdGhpcy53O1xyXG4gICAgICBsZXQgcXggPSBxLngsIHF5ID0gcS55LCBxeiA9IHEueiwgcXcgPSBxLnc7XHJcblxyXG4gICAgICB0aGlzLnggPSB4ICogcXcgKyB3ICogcXggKyB5ICogcXogLSB6ICogcXk7XHJcbiAgICAgIHRoaXMueSA9IHkgKiBxdyArIHcgKiBxeSArIHogKiBxeCAtIHggKiBxejtcclxuICAgICAgdGhpcy56ID0geiAqIHF3ICsgdyAqIHF6ICsgeCAqIHF5IC0geSAqIHF4O1xyXG4gICAgICB0aGlzLncgPSB3ICogcXcgLSB4ICogcXggLSB5ICogcXkgLSB6ICogcXo7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgQUFCQjNEIHtcclxuICAgIHB1YmxpYyBtaW5YOiBudW1iZXIgPSArSW5maW5pdHk7XHJcbiAgICBwdWJsaWMgbWF4WDogbnVtYmVyID0gLUluZmluaXR5O1xyXG4gICAgcHVibGljIG1pblk6IG51bWJlciA9ICtJbmZpbml0eTtcclxuICAgIHB1YmxpYyBtYXhZOiBudW1iZXIgPSAtSW5maW5pdHk7XHJcbiAgICBwdWJsaWMgbWluWjogbnVtYmVyID0gK0luZmluaXR5O1xyXG4gICAgcHVibGljIG1heFo6IG51bWJlciA9IC1JbmZpbml0eTtcclxuXHJcbiAgICBwdWJsaWMgYWRkUG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICB0aGlzLm1pblggPSBNYXRoLm1pbih0aGlzLm1pblgsIHgpO1xyXG4gICAgICB0aGlzLm1heFggPSBNYXRoLm1heCh0aGlzLm1heFgsIHgpO1xyXG4gICAgICB0aGlzLm1pblkgPSBNYXRoLm1pbih0aGlzLm1pblksIHkpO1xyXG4gICAgICB0aGlzLm1heFkgPSBNYXRoLm1heCh0aGlzLm1heFksIHkpO1xyXG4gICAgICB0aGlzLm1pblogPSBNYXRoLm1pbih0aGlzLm1pblosIHopO1xyXG4gICAgICB0aGlzLm1heFogPSBNYXRoLm1heCh0aGlzLm1heFosIHopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRWZWN0b3IodjogVmVjMyB8IFZlYzQpIHtcclxuICAgICAgdGhpcy5hZGRQb2ludCh2LngsIHYueSwgdi56KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQUFCQihib3g6IEFBQkIzRCkge1xyXG4gICAgICB0aGlzLmFkZFBvaW50KGJveC5taW5YLCBib3gubWluWSwgYm94Lm1pblopO1xyXG4gICAgICB0aGlzLmFkZFBvaW50KGJveC5tYXhYLCBib3gubWF4WSwgYm94Lm1heFopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgdGhpcy5taW5YID0gK0luZmluaXR5O1xyXG4gICAgICB0aGlzLm1heFggPSAtSW5maW5pdHk7XHJcbiAgICAgIHRoaXMubWluWSA9ICtJbmZpbml0eTtcclxuICAgICAgdGhpcy5tYXhZID0gLUluZmluaXR5O1xyXG4gICAgICB0aGlzLm1pblogPSArSW5maW5pdHk7XHJcbiAgICAgIHRoaXMubWF4WiA9IC1JbmZpbml0eTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2VudGVyKCk6IFZlYzMge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgICAgLjUgKiAodGhpcy5taW5YICsgdGhpcy5tYXhYKSxcclxuICAgICAgICAuNSAqICh0aGlzLm1pblkgKyB0aGlzLm1heFkpLFxyXG4gICAgICAgIC41ICogKHRoaXMubWluWiArIHRoaXMubWF4WilcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXh0ZW50cygpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKFxyXG4gICAgICAgICh0aGlzLm1heFggLSB0aGlzLm1pblgpLFxyXG4gICAgICAgICh0aGlzLm1heFkgLSB0aGlzLm1pblkpLFxyXG4gICAgICAgICh0aGlzLm1heFogLSB0aGlzLm1pblopXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1pbigpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKFxyXG4gICAgICAgIHRoaXMubWluWCxcclxuICAgICAgICB0aGlzLm1pblksXHJcbiAgICAgICAgdGhpcy5taW5aXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1heCgpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKFxyXG4gICAgICAgIHRoaXMubWF4WCxcclxuICAgICAgICB0aGlzLm1heFksXHJcbiAgICAgICAgdGhpcy5tYXhaXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnRhaW5zKHY6IFZlYzMgfCBWZWM0KSB7XHJcbiAgICAgIHJldHVybiB2LnggPj0gdGhpcy5taW5YICYmIHYueCA8PSB0aGlzLm1heFggJiZcclxuICAgICAgICB2LnkgPj0gdGhpcy5taW5ZICYmIHYueSA8PSB0aGlzLm1heFkgJiZcclxuICAgICAgICB2LnogPj0gdGhpcy5taW5aICYmIHYueiA8PSB0aGlzLm1heFo7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYW5zZm9ybShtYXRyaXg6IE1hdHJpeDQpOiBBQUJCM0Qge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gbmV3IEFBQkIzRCgpO1xyXG5cclxuICAgICAgbGV0IG1pblYgPSA8VmVjND5tYXRyaXgubXVsdGlwbHkobmV3IFZlYzQodGhpcy5taW5YLCB0aGlzLm1pblksIHRoaXMubWluWiwgMSkpO1xyXG4gICAgICBsZXQgbWF4ViA9IDxWZWM0Pm1hdHJpeC5tdWx0aXBseShuZXcgVmVjNCh0aGlzLm1heFgsIHRoaXMubWF4WSwgdGhpcy5tYXhaLCAxKSk7XHJcblxyXG4gICAgICByZXN1bHQubWluWCA9IG1pblYueDsgcmVzdWx0Lm1pblkgPSBtaW5WLnk7IHJlc3VsdC5taW5aID0gbWluVi56O1xyXG4gICAgICByZXN1bHQubWF4WCA9IG1heFYueDsgcmVzdWx0Lm1heFkgPSBtYXhWLnk7IHJlc3VsdC5tYXhaID0gbWF4Vi56O1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJzZWN0c1JheShyYXk6IExpbmUzRCk6IFZlYzMge1xyXG4gICAgICBsZXQgcmVzdWx0OiBWZWMzID0gbnVsbDtcclxuXHJcbiAgICAgIGxldCB2MCA9IHJheS5wMC5hc1ZlYzMoKTtcclxuICAgICAgbGV0IGRpciA9IHJheS5wMS5hc1ZlYzMoKS5zdWIocmF5LnAwLmFzVmVjMygpKTtcclxuXHJcbiAgICAgIGxldCBpbnRYMCA9IHJheS5pbnRlcnNlY3RSYXlXaXRoUGxhbmUobmV3IFZlYzModGhpcy5taW5YLCAwLCAwKSwgbmV3IFZlYzMoLTEsIDAsIDApKTtcclxuICAgICAgbGV0IGludFgxID0gcmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgVmVjMyh0aGlzLm1heFgsIDAsIDApLCBuZXcgVmVjMygxLCAwLCAwKSk7XHJcbiAgICAgIGxldCBpbnRZMCA9IHJheS5pbnRlcnNlY3RSYXlXaXRoUGxhbmUobmV3IFZlYzMoMCwgdGhpcy5taW5ZLCAwKSwgbmV3IFZlYzMoMCwgLTEsIDApKTtcclxuICAgICAgbGV0IGludFkxID0gcmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgVmVjMygwLCB0aGlzLm1heFksIDApLCBuZXcgVmVjMygwLCAxLCAwKSk7XHJcbiAgICAgIGxldCBpbnRaMCA9IHJheS5pbnRlcnNlY3RSYXlXaXRoUGxhbmUobmV3IFZlYzMoMCwgMCwgdGhpcy5taW5aKSwgbmV3IFZlYzMoMCwgMCwgLTEpKTtcclxuICAgICAgbGV0IGludFoxID0gcmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgVmVjMygwLCAwLCB0aGlzLm1heFopLCBuZXcgVmVjMygwLCAwLCAxKSk7XHJcblxyXG4gICAgICBsZXQgY3VyckRpc3QgPSBJbmZpbml0eTtcclxuICAgICAgaWYgKGludFgwICYmIHRoaXMuY29udGFpbnMoaW50WDApKSB7IGN1cnJEaXN0ID0gdjAuc3F1YXJlZERpc3QoaW50WDApOyByZXN1bHQgPSBpbnRYMDsgfVxyXG4gICAgICBpZiAoaW50WDEgJiYgdGhpcy5jb250YWlucyhpbnRYMSkgJiYgdjAuc3F1YXJlZERpc3QoaW50WDEpIDwgY3VyckRpc3QpIHsgY3VyckRpc3QgPSB2MC5zcXVhcmVkRGlzdChpbnRYMSk7IHJlc3VsdCA9IGludFgxOyB9XHJcbiAgICAgIGlmIChpbnRZMCAmJiB0aGlzLmNvbnRhaW5zKGludFkwKSAmJiB2MC5zcXVhcmVkRGlzdChpbnRZMCkgPCBjdXJyRGlzdCkgeyBjdXJyRGlzdCA9IHYwLnNxdWFyZWREaXN0KGludFkwKTsgcmVzdWx0ID0gaW50WTA7IH1cclxuICAgICAgaWYgKGludFkxICYmIHRoaXMuY29udGFpbnMoaW50WTEpICYmIHYwLnNxdWFyZWREaXN0KGludFkxKSA8IGN1cnJEaXN0KSB7IGN1cnJEaXN0ID0gdjAuc3F1YXJlZERpc3QoaW50WTEpOyByZXN1bHQgPSBpbnRZMTsgfVxyXG4gICAgICBpZiAoaW50WjAgJiYgdGhpcy5jb250YWlucyhpbnRaMCkgJiYgdjAuc3F1YXJlZERpc3QoaW50WjApIDwgY3VyckRpc3QpIHsgY3VyckRpc3QgPSB2MC5zcXVhcmVkRGlzdChpbnRaMCk7IHJlc3VsdCA9IGludFowOyB9XHJcbiAgICAgIGlmIChpbnRaMSAmJiB0aGlzLmNvbnRhaW5zKGludFoxKSAmJiB2MC5zcXVhcmVkRGlzdChpbnRaMSkgPCBjdXJyRGlzdCkgeyBjdXJyRGlzdCA9IHYwLnNxdWFyZWREaXN0KGludFoxKTsgcmVzdWx0ID0gaW50WjE7IH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgUG9pbnQzRCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB6OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD8sIHk/LCB6Pykge1xyXG4gICAgICB0aGlzLnggPSB4IHx8IDAuMDtcclxuICAgICAgdGhpcy55ID0geSB8fCAwLjA7XHJcbiAgICAgIHRoaXMueiA9IHogfHwgMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjMygpOiBWZWMzIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgfVxyXG5cclxuICAgIGFzVmVjNCh3PzogbnVtYmVyKTogVmVjNCB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB3IHx8IDEuMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgTGluZTNEIHtcclxuICAgIHAwOiBQb2ludDNEO1xyXG4gICAgcDE6IFBvaW50M0Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IocDAsIHAxKSB7XHJcbiAgICAgIHRoaXMucDAgPSBwMCB8fCBuZXcgUG9pbnQzRCgpO1xyXG4gICAgICB0aGlzLnAxID0gcDEgfHwgbmV3IFBvaW50M0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW50ZXJzZWN0UmF5V2l0aFBsYW5lKHYwOiBWZWMzLCBuOiBWZWMzKTogVmVjMyB7XHJcbiAgICAgIGxldCByZXN1bHQ6IFZlYzMgPSBudWxsO1xyXG5cclxuICAgICAgbGV0IHUgPSB0aGlzLnAxLmFzVmVjMygpLnN1Yih0aGlzLnAwLmFzVmVjMygpKTtcclxuXHJcbiAgICAgIGxldCBEID0gbi5kb3QodSk7XHJcbiAgICAgIGlmIChEICE9IDApIHtcclxuICAgICAgICBsZXQgdyA9IHRoaXMucDAuYXNWZWMzKCkuc3ViKHYwKTtcclxuICAgICAgICBsZXQgTiA9IC1uLmRvdCh3KTtcclxuICAgICAgICBsZXQgc0kgPSBOIC8gRDtcclxuXHJcbiAgICAgICAgaWYgKHNJID49IDApIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMucDAuYXNWZWMzKCkuYWRkKHUubXVsdGlwbHkoc0kpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJzZWN0VHJpYW5nbGUocDAsIHAxLCBwMikge1xyXG4gICAgICBsZXQgbWF0cml4ID0gbmV3IE1hdHJpeDMoW1xyXG4gICAgICAgIHRoaXMucDAueCAtIHRoaXMucDEueCwgcDEueCAtIHAwLngsIHAyLnggLSBwMC54LFxyXG4gICAgICAgIHRoaXMucDAueSAtIHRoaXMucDEueSwgcDEueSAtIHAwLnksIHAyLnkgLSBwMC55LFxyXG4gICAgICAgIHRoaXMucDAueiAtIHRoaXMucDEueiwgcDEueiAtIHAwLnosIHAyLnogLSBwMC56XHJcbiAgICAgIF0pLmludmVyc2UoKTtcclxuXHJcbiAgICAgIGlmIChtYXRyaXgpIHtcclxuICAgICAgICBsZXQgcmVzID0gbWF0cml4Lm11bHRpcGx5KHRoaXMucDAuYXNWZWMzKCkuc3ViKHAwLmFzVmVjMygpKSk7XHJcbiAgICAgICAgaWYgKHJlcyAmJiAoPFZlYzM+cmVzKS55ID49IDAgJiYgKDxWZWMzPnJlcykueSA8PSAxLjAgJiYgKDxWZWMzPnJlcykueiA+PSAwICYmICg8VmVjMz5yZXMpLnogPD0gMS4wICYmICg8VmVjMz5yZXMpLnkgKyAoPFZlYzM+cmVzKS56IDw9IDEuMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHAwLmFzVmVjMygpXHJcbiAgICAgICAgICAgIC5hZGQocDEuYXNWZWMzKCkuc3ViKHAwLmFzVmVjMygpKS5tdWx0aXBseSgoPFZlYzM+cmVzKS55KSlcclxuICAgICAgICAgICAgLmFkZChwMi5hc1ZlYzMoKS5zdWIocDAuYXNWZWMzKCkpLm11bHRpcGx5KCg8VmVjMz5yZXMpLnopKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKG1hdHJpeDogTWF0cml4NCkge1xyXG4gICAgICBsZXQgdjAgPSA8VmVjND5tYXRyaXgubXVsdGlwbHkodGhpcy5wMC5hc1ZlYzQoKSk7XHJcbiAgICAgIGxldCB2MSA9IDxWZWM0Pm1hdHJpeC5tdWx0aXBseSh0aGlzLnAxLmFzVmVjNCgpKTtcclxuICAgICAgcmV0dXJuIG5ldyBMaW5lM0QobmV3IFBvaW50M0QodjAueCwgdjAueSwgdjAueiksIG5ldyBQb2ludDNEKHYxLngsIHYxLnksIHYxLnopKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHJpdmF0ZSBfcG9zaXRpb246IFZlYzM7XHJcbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IFZlYzM7XHJcbiAgICBwcml2YXRlIF91cDogVmVjMztcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRWaWV3TWF0cml4OiBNYXRyaXg0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uPzogVmVjMywgZGlyZWN0aW9uPzogVmVjMywgdXA/OiBWZWMzKSB7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb24gfHwgbmV3IFZlYzMoMC4wLCAwLjAsIDIwLjApO1xyXG4gICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb24gfHwgbmV3IFZlYzMoMC4wLCAwLjAsIC0xLjApO1xyXG4gICAgICB0aGlzLl91cCA9IHVwIHx8IG5ldyBWZWMzKDAuMCwgMS4wLCAwLjApO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZWQoKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFZpZXdNYXRyaXggPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5fcG9zaXRpb24ueCA9IHggfHwgMC4wO1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbi55ID0geSB8fCAwLjA7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uLnogPSB6IHx8IDAuMDtcclxuICAgICAgdGhpcy5jaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlyZWN0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5fZGlyZWN0aW9uLnggPSB4O1xyXG4gICAgICB0aGlzLl9kaXJlY3Rpb24ueSA9IHk7XHJcbiAgICAgIHRoaXMuX2RpcmVjdGlvbi56ID0gejtcclxuICAgICAgdGhpcy5jaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2VudGVyKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5fZGlyZWN0aW9uLnggPSB4IC0gdGhpcy5fcG9zaXRpb24ueDtcclxuICAgICAgdGhpcy5fZGlyZWN0aW9uLnkgPSB5IC0gdGhpcy5fcG9zaXRpb24ueTtcclxuICAgICAgdGhpcy5fZGlyZWN0aW9uLnogPSB6IC0gdGhpcy5fcG9zaXRpb24uejtcclxuICAgICAgdGhpcy5jaGFuZ2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9zaXRpb24oKTogVmVjMyB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBhc1ZlYzMoKTogVmVjMyB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBhc1ZlYzQoKTogVmVjNCB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbi5hc1ZlYzQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0aW9uTWF0cml4KHdpZHRoLCBoZWlnaHQpOiBNYXRyaXg0IHtcclxuICAgICAgcmV0dXJuIHRoaXMubWFrZVBlcnNwZWN0aXZlKDQ1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwMC4wKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaWV3TWF0cml4KCk6IE1hdHJpeDQge1xyXG4gICAgICByZXR1cm4gPHBzZ2VvbWV0cnkuTWF0cml4ND50aGlzLm1ha2VMb29rQXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1ha2VQZXJzcGVjdGl2ZShmb3Z5LCBhc3BlY3QsIHpuZWFyLCB6ZmFyKTogTWF0cml4NCB7XHJcbiAgICAgIGxldCB5bWF4ID0gem5lYXIgKiBNYXRoLnRhbihmb3Z5ICogTWF0aC5QSSAvIDM2MC4wKTtcclxuICAgICAgbGV0IHltaW4gPSAteW1heDtcclxuICAgICAgbGV0IHhtaW4gPSB5bWluICogYXNwZWN0O1xyXG4gICAgICBsZXQgeG1heCA9IHltYXggKiBhc3BlY3Q7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5tYWtlRnJ1c3R1bSh4bWluLCB4bWF4LCB5bWluLCB5bWF4LCB6bmVhciwgemZhcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYWtlRnJ1c3R1bShsZWZ0LCByaWdodCxcclxuICAgICAgYm90dG9tLCB0b3AsXHJcbiAgICAgIHpuZWFyLCB6ZmFyKTogTWF0cml4NCB7XHJcbiAgICAgIGxldCB4ID0gMiAqIHpuZWFyIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgIGxldCB5ID0gMiAqIHpuZWFyIC8gKHRvcCAtIGJvdHRvbSk7XHJcbiAgICAgIGxldCBhID0gKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KTtcclxuICAgICAgbGV0IGIgPSAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pO1xyXG4gICAgICBsZXQgYyA9IC0oemZhciArIHpuZWFyKSAvICh6ZmFyIC0gem5lYXIpO1xyXG4gICAgICBsZXQgZCA9IC0yICogemZhciAqIHpuZWFyIC8gKHpmYXIgLSB6bmVhcik7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IE1hdHJpeDQoXHJcbiAgICAgICAgW3gsIDAsIGEsIDAsXHJcbiAgICAgICAgICAwLCB5LCBiLCAwLFxyXG4gICAgICAgICAgMCwgMCwgYywgZCxcclxuICAgICAgICAgIDAsIDAsIC0xLCAwXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYWtlT3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCB6bmVhciwgemZhcik6IE1hdHJpeDQge1xyXG4gICAgICBsZXQgdHggPSAtKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KTtcclxuICAgICAgbGV0IHR5ID0gLSh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSk7XHJcbiAgICAgIGxldCB0eiA9IC0oemZhciArIHpuZWFyKSAvICh6ZmFyIC0gem5lYXIpO1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KFxyXG4gICAgICAgIFsyIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIHR4LFxyXG4gICAgICAgICAgMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCB0eSxcclxuICAgICAgICAgIDAsIDAsIC0yIC8gKHpmYXIgLSB6bmVhciksIHR6LFxyXG4gICAgICAgICAgMCwgMCwgMCwgMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWFrZUxvb2tBdCgpOiBNYXRyaXg0IHtcclxuICAgICAgbGV0IGV5ZSA9IHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgICBsZXQgY2VudGVyID0gdGhpcy5fcG9zaXRpb24uYWRkKHRoaXMuX2RpcmVjdGlvbik7XHJcbiAgICAgIGxldCB1cCA9IHRoaXMuX3VwO1xyXG5cclxuICAgICAgbGV0IHogPSBleWUuc3ViKGNlbnRlcikubm9ybWFsaXplKCk7XHJcbiAgICAgIGxldCB4ID0gdXAuY3Jvc3Moeikubm9ybWFsaXplKCk7XHJcbiAgICAgIGxldCB5ID0gei5jcm9zcyh4KS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgIGxldCBtID0gbmV3IE1hdHJpeDQoW1xyXG4gICAgICAgIHgueCwgeC55LCB4LnosIDAsXHJcbiAgICAgICAgeS54LCB5LnksIHkueiwgMCxcclxuICAgICAgICB6LngsIHoueSwgei56LCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDFdKTtcclxuXHJcbiAgICAgIGxldCB0ID0gbmV3IE1hdHJpeDQoW1xyXG4gICAgICAgIDEsIDAsIDAsIC1leWUueCxcclxuICAgICAgICAwLCAxLCAwLCAtZXllLnksXHJcbiAgICAgICAgMCwgMCwgMSwgLWV5ZS56LFxyXG4gICAgICAgIDAsIDAsIDAsIDFdKTtcclxuXHJcbiAgICAgIHJldHVybiA8TWF0cml4ND50Lm11bHRpcGx5KG0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcG9pbnRJblRyaWFuZ2xlKHAsIGEsIGIsIGMpOiBib29sZWFuIHtcclxuICAgIC8vIENvbXB1dGUgdmVjdG9ycyAgICAgICAgXHJcbiAgICBsZXQgdjAgPSBjLnN1YnRyYWN0KGEpO1xyXG4gICAgbGV0IHYxID0gYi5zdWJ0cmFjdChhKTtcclxuICAgIGxldCB2MiA9IHAuc3VidHJhY3QoYSk7XHJcblxyXG4gICAgLy8gQ29tcHV0ZSBkb3QgcHJvZHVjdHNcclxuICAgIGxldCBkb3QwMCA9IHYwLmRvdCh2MClcclxuICAgIGxldCBkb3QwMSA9IHYwLmRvdCh2MSlcclxuICAgIGxldCBkb3QwMiA9IHYwLmRvdCh2MilcclxuICAgIGxldCBkb3QxMSA9IHYxLmRvdCh2MSlcclxuICAgIGxldCBkb3QxMiA9IHYxLmRvdCh2MilcclxuXHJcbiAgICAvLyBDb21wdXRlIGJhcnljZW50cmljIGNvb3JkaW5hdGVzXHJcbiAgICBsZXQgaW52RGVub20gPSAxIC8gKGRvdDAwICogZG90MTEgLSBkb3QwMSAqIGRvdDAxKVxyXG4gICAgbGV0IHUgPSAoZG90MTEgKiBkb3QwMiAtIGRvdDAxICogZG90MTIpICogaW52RGVub21cclxuICAgIGxldCB2ID0gKGRvdDAwICogZG90MTIgLSBkb3QwMSAqIGRvdDAyKSAqIGludkRlbm9tXHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgcG9pbnQgaXMgaW4gdHJpYW5nbGVcclxuICAgIHJldHVybiAodSA+PSAwKSAmJiAodiA+PSAwKSAmJiAodSArIHYgPCAxKTtcclxuICB9XHJcblxyXG5cclxuICBleHBvcnQgY2xhc3MgVmVjMiB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzogbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMueCA9IHggfHwgMC4wO1xyXG4gICAgICB0aGlzLnkgPSB5IHx8IDAuMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3ViKHY6IFZlYzIpIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCAtIHYueCwgdGhpcy55IC0gdi55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc2lkZVRyaShhOiBWZWMyLCBiOiBWZWMyLCBjOiBWZWMyLCBwOiBWZWMyKSB7XHJcbiAgICAgIHJldHVybiBWZWMyLmNyb3NzKGMuc3ViKGIpLCBwLnN1YihiKSkgPj0gLjAgJiZcclxuICAgICAgICBWZWMyLmNyb3NzKGEuc3ViKGMpLCBwLnN1YihjKSkgPj0gLjAgJiZcclxuICAgICAgICBWZWMyLmNyb3NzKGIuc3ViKGEpLCBwLnN1YihhKSkgPj0gLjA7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3Jvc3ModjA6IFZlYzIsIHYxOiBWZWMyKTogbnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHYwLnggKiB2MS55IC0gdjAueSAqIHYxLng7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFBvbHlnb24yRCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgRXBzaWxvbiA9IDFlLTEwO1xyXG5cclxuICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PFZlYzI+ID0gW107XHJcblxyXG4gICAgcHVibGljIGdldCBWZXJ0aWNlcygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmVydGljZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFZlcnRleCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFZlYzIoeCwgeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRWZWN0b3IodjogVmVjMikge1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLnB1c2godik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFRvQUFCQihib3g6IEFBQkIyRCkge1xyXG4gICAgICB0aGlzLnZlcnRpY2VzLmZvckVhY2goKHApID0+IHtcclxuICAgICAgICBib3guYWRkVmVjdG9yKHApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgIHRoaXMudmVydGljZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXJlYSgpOiBudW1iZXIge1xyXG4gICAgICAvLyBzZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTY1OTQzXHJcbiAgICAgIGxldCByZXN1bHQgPSAwO1xyXG5cclxuICAgICAgbGV0IG4gPSB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcclxuICAgICAgZm9yIChsZXQgaSA9IG4gLSAxLCBxID0gMDsgcSA8IG47IGkgPSBxKyspIHtcclxuICAgICAgICByZXN1bHQgKz0gdGhpcy52ZXJ0aWNlc1tpXS54ICogdGhpcy52ZXJ0aWNlc1txXS55IC0gdGhpcy52ZXJ0aWNlc1txXS54ICogdGhpcy52ZXJ0aWNlc1tpXS55O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0ICogMC41O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzbmlwKHU6IG51bWJlciwgdjogbnVtYmVyLCB3OiBudW1iZXIsIG46IG51bWJlciwgaW5kaWNlczogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgbGV0IGEgPSB0aGlzLnZlcnRpY2VzW2luZGljZXNbdV1dO1xyXG4gICAgICBsZXQgYiA9IHRoaXMudmVydGljZXNbaW5kaWNlc1t2XV07XHJcbiAgICAgIGxldCBjID0gdGhpcy52ZXJ0aWNlc1tpbmRpY2VzW3ddXTtcclxuICAgICAgbGV0IHA6IFZlYzI7XHJcblxyXG4gICAgICByZXN1bHQgPSAoYi54IC0gYS54KSAqIChjLnkgLSBhLnkpIC0gKGIueSAtIGEueSkgKiAoYy54IC0gYS54KSA+IFBvbHlnb24yRC5FcHNpbG9uO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuICYmIHJlc3VsdDsgKytpKSB7XHJcbiAgICAgICAgaWYgKChpICE9IHUpICYmIChpICE9IHYpICYmIChpICE9IHcpKSB7XHJcbiAgICAgICAgICBwID0gdGhpcy52ZXJ0aWNlc1tpbmRpY2VzW2ldXTtcclxuICAgICAgICAgIHJlc3VsdCA9ICFWZWMyLmluc2lkZVRyaShhLCBiLCBjLCBwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyaWFuZ3VsYXRlKCk6IFBvbHlnb24yRCB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBuZXcgUG9seWdvbjJEKCk7XHJcblxyXG4gICAgICBsZXQgbiA9IHRoaXMudmVydGljZXMubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKG4gPiAyKSB7XHJcbiAgICAgICAgbGV0IGluZGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXJlYSgpID4gLjApIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSBpbmRpY2VzW2ldID0gaTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIGluZGljZXNbaV0gPSAobiAtIDEpIC0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBudiA9IG47XHJcblxyXG4gICAgICAgIC8qICByZW1vdmUgbnYtMiBWZXJ0aWNlcywgY3JlYXRpbmcgMSB0cmlhbmdsZSBldmVyeSB0aW1lICovXHJcbiAgICAgICAgbGV0IGNvdW50ID0gMiAqIG52OyAgIC8qIGVycm9yIGRldGVjdGlvbiAqL1xyXG5cclxuICAgICAgICBmb3IgKGxldCBtID0gMCwgdiA9IG52IC0gMTsgbnYgPiAyOykge1xyXG4gICAgICAgICAgLyogaWYgd2UgbG9vcCwgaXQgaXMgcHJvYmFibHkgYSBub24tc2ltcGxlIHBvbHlnb24gKi9cclxuICAgICAgICAgIGlmICgwID49IGNvdW50LS0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2x5Z29uMkQoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvKiB0aHJlZSBjb25zZWN1dGl2ZSB2ZXJ0aWNlcyBpbiBjdXJyZW50IHBvbHlnb24sIDx1LHYsdz4gKi9cclxuICAgICAgICAgIGxldCB1ID0gdjsgaWYgKG52IDw9IHUpIHUgPSAwOyAgICAgLyogcHJldmlvdXMgKi9cclxuICAgICAgICAgIHYgPSB1ICsgMTsgaWYgKG52IDw9IHYpIHYgPSAwOyAgICAgLyogbmV3IHYgICAgKi9cclxuICAgICAgICAgIGxldCB3ID0gdiArIDE7IGlmIChudiA8PSB3KSB3ID0gMDsgICAgIC8qIG5leHQgICAgICovXHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuc25pcCh1LCB2LCB3LCBudiwgaW5kaWNlcykpIHtcclxuICAgICAgICAgICAgbGV0IGEsIGIsIGMsIHMsIHQ7XHJcblxyXG4gICAgICAgICAgICAvKiB0cnVlIG5hbWVzIG9mIHRoZSB2ZXJ0aWNlcyAqL1xyXG4gICAgICAgICAgICBhID0gaW5kaWNlc1t1XTsgYiA9IGluZGljZXNbdl07IGMgPSBpbmRpY2VzW3ddO1xyXG5cclxuICAgICAgICAgICAgLyogb3V0cHV0IFRyaWFuZ2xlICovXHJcbiAgICAgICAgICAgIHJlc3VsdC5hZGRWZWN0b3IodGhpcy52ZXJ0aWNlc1tjXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hZGRWZWN0b3IodGhpcy52ZXJ0aWNlc1tiXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hZGRWZWN0b3IodGhpcy52ZXJ0aWNlc1thXSk7XHJcblxyXG4gICAgICAgICAgICArK207XHJcblxyXG4gICAgICAgICAgICAvKiByZW1vdmUgdiBmcm9tIHJlbWFpbmluZyBwb2x5Z29uICovXHJcbiAgICAgICAgICAgIGZvciAocyA9IHYsIHQgPSB2ICsgMTsgdCA8IG52OyBzKysgLCB0KyspIHtcclxuICAgICAgICAgICAgICBpbmRpY2VzW3NdID0gaW5kaWNlc1t0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAtLW52O1xyXG5cclxuICAgICAgICAgICAgLyogcmVzZXQgZXJyb3IgZGV0ZWN0aW9uIGNvdW50ZXIgKi9cclxuICAgICAgICAgICAgY291bnQgPSAyICogbnY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIEFBQkIyRCB7XHJcbiAgICBwdWJsaWMgbWluWDogbnVtYmVyID0gK0luZmluaXR5O1xyXG4gICAgcHVibGljIG1heFg6IG51bWJlciA9IC1JbmZpbml0eTtcclxuICAgIHB1YmxpYyBtaW5ZOiBudW1iZXIgPSArSW5maW5pdHk7XHJcbiAgICBwdWJsaWMgbWF4WTogbnVtYmVyID0gLUluZmluaXR5O1xyXG5cclxuICAgIHB1YmxpYyBhZGRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICB0aGlzLm1pblggPSBNYXRoLm1pbih0aGlzLm1pblgsIHgpO1xyXG4gICAgICB0aGlzLm1heFggPSBNYXRoLm1heCh0aGlzLm1heFgsIHgpO1xyXG4gICAgICB0aGlzLm1pblkgPSBNYXRoLm1pbih0aGlzLm1pblksIHkpO1xyXG4gICAgICB0aGlzLm1heFkgPSBNYXRoLm1heCh0aGlzLm1heFksIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRWZWN0b3IodjogVmVjMiB8IFZlYzMgfCBWZWM0KSB7XHJcbiAgICAgIHRoaXMuYWRkUG9pbnQodi54LCB2LnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRBQUJCKGJveDogQUFCQjJEKSB7XHJcbiAgICAgIHRoaXMuYWRkUG9pbnQoYm94Lm1pblgsIGJveC5taW5ZKTtcclxuICAgICAgdGhpcy5hZGRQb2ludChib3gubWF4WCwgYm94Lm1heFkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgdGhpcy5taW5YID0gK0luZmluaXR5O1xyXG4gICAgICB0aGlzLm1heFggPSAtSW5maW5pdHk7XHJcbiAgICAgIHRoaXMubWluWSA9ICtJbmZpbml0eTtcclxuICAgICAgdGhpcy5tYXhZID0gLUluZmluaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjZW50ZXIoKTogVmVjMiB7XHJcbiAgICAgIHJldHVybiBuZXcgVmVjMihcclxuICAgICAgICAuNSAqICh0aGlzLm1pblggKyB0aGlzLm1heFgpLFxyXG4gICAgICAgIC41ICogKHRoaXMubWluWSArIHRoaXMubWF4WSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXh0ZW50cygpOiBWZWMyIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMyKFxyXG4gICAgICAgICh0aGlzLm1heFggLSB0aGlzLm1pblgpLFxyXG4gICAgICAgICh0aGlzLm1heFkgLSB0aGlzLm1pblkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1pbigpOiBWZWMyIHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWMyKFxyXG4gICAgICAgIHRoaXMubWluWCxcclxuICAgICAgICB0aGlzLm1pbllcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWF4KCk6IFZlYzIge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzIoXHJcbiAgICAgICAgdGhpcy5tYXhYLFxyXG4gICAgICAgIHRoaXMubWF4WVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb250YWlucyh2OiBWZWMyIHwgVmVjMyB8IFZlYzQpIHtcclxuICAgICAgcmV0dXJuIHYueCA+PSB0aGlzLm1pblggJiYgdi54IDw9IHRoaXMubWF4WCAmJlxyXG4gICAgICAgIHYueSA+PSB0aGlzLm1pblkgJiYgdi55IDw9IHRoaXMubWF4WVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlcHJlc2VudHMgYSBwb2ludCBpbiAzRCBzcGFjZSB1c2luZyBzcGhlcmljYWwgY29vcmRpbmF0ZXMuXHJcbiAgICovXHJcbiAgZXhwb3J0IGNsYXNzIFNwaGVyaWNhbCB7XHJcblxyXG4gICAgcHVibGljIHIgPSAwO1xyXG4gICAgcHVibGljIGF6aW11dGggPSAwO1xyXG4gICAgcHVibGljIHBvbGFyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocjogbnVtYmVyLCBhemltdXRoOiBudW1iZXIsIHBvbGFyOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5yID0gcjtcclxuICAgICAgdGhpcy5hemltdXRoID0gYXppbXV0aDtcclxuICAgICAgdGhpcy5wb2xhciA9IHBvbGFyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb252ZXJ0cyBjYXJ0ZXNpYW4gY29vcmRpbmF0ZXMgeCx5LHogdG8gc3BoZXJpY2FsIGNvb3JkaW5hdGVzLlxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGcm9tQ2FydGVzaWFuKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBTcGhlcmljYWwge1xyXG4gICAgICBsZXQgciA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xyXG4gICAgICByZXR1cm4gbmV3IFNwaGVyaWNhbChcclxuICAgICAgICByLFxyXG4gICAgICAgIE1hdGguYXNpbih5IC8gciksXHJcbiAgICAgICAgTWF0aC5hdGFuMigteCwgeikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb252ZXJ0cyBjYXJ0ZXNpYW4gdmVjdG9yIHRvIHNwaGVyaWNhbCBjb29yZGluYXRlcy5cclxuICAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRnJvbUNhcnRlc2lhblZlY3Rvcih2OiBWZWM0IHwgVmVjMykge1xyXG4gICAgICByZXR1cm4gU3BoZXJpY2FsLkZyb21DYXJ0ZXNpYW4odi54LCB2LnksIHYueik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbnZlcnRzIHNwaGVyaWNhbCBjb29yZGluYXRlcyB0byBjYXJ0ZXNpYW4gdmVjdG9yLlxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUb0NhcnRlc2lhbihyOiBudW1iZXIsIHBvbGFyOiBudW1iZXIsIGF6aW11dGg6IG51bWJlcik6IFZlYzQge1xyXG4gICAgICByZXR1cm4gbmV3IFZlYzQociAqIE1hdGguY29zKHBvbGFyKSAqIE1hdGguc2luKGF6aW11dGgpLFxyXG4gICAgICAgIC1yICogTWF0aC5zaW4ocG9sYXIpLFxyXG4gICAgICAgIC1yICogTWF0aC5jb3MocG9sYXIpICogTWF0aC5jb3MoYXppbXV0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb252ZXJ0cyBzcGhlcmljYWwgY29vcmRpbmF0ZXMgdG8gY2FydGVzaWFuIHZlY3Rvci5cclxuICAgICAgKi9cclxuICAgIHB1YmxpYyB0b0NhcnRlc2lhbigpOiBWZWM0IHtcclxuICAgICAgcmV0dXJuIG5ldyBWZWM0KHRoaXMuciAqIE1hdGguY29zKHRoaXMucG9sYXIpICogTWF0aC5zaW4odGhpcy5hemltdXRoKSxcclxuICAgICAgICAtdGhpcy5yICogTWF0aC5zaW4odGhpcy5wb2xhciksXHJcbiAgICAgICAgLXRoaXMuciAqIE1hdGguY29zKHRoaXMucG9sYXIpICogTWF0aC5jb3ModGhpcy5hemltdXRoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==