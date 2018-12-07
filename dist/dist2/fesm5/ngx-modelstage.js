import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { __extends, __read, __assign } from 'tslib';
import JQuery, { $ } from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-mousewheel';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
var psgeometry;
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
                for (var v = nv - 1; nv > 2;) {
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
        var crypto = window.crypto || ((/** @type {?} */ (window))).msCrypto;
        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    }
    modelstageweb.uuidv4 = uuidv4;
    var ToolsWebGL = /** @class */ (function () {
        function ToolsWebGL(stage) {
            this.stage = stage;
        }
        /**
         * @param {?} shaderType
         * @param {?} shaderSource
         * @return {?}
         */
        ToolsWebGL.prototype.createShader = /**
         * @param {?} shaderType
         * @param {?} shaderSource
         * @return {?}
         */
        function (shaderType, shaderSource) {
            /** @type {?} */
            var shader = this.stage.gl.createShader(shaderType);
            this.stage.gl.shaderSource(shader, shaderSource);
            this.stage.gl.compileShader(shader);
            console.log(this.stage.gl.getShaderInfoLog(shader));
            return shader;
        };
        return ToolsWebGL;
    }());
    modelstageweb.ToolsWebGL = ToolsWebGL;
    var BlockStreamBlockDescriptor = /** @class */ (function () {
        function BlockStreamBlockDescriptor() {
        }
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "BlockType", {
            get: /**
             * @return {?}
             */
            function () {
                return this.blockType;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.blockType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "MajorVersion", {
            get: /**
             * @return {?}
             */
            function () {
                return this.majorVersion;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.majorVersion = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "MinorVersion", {
            get: /**
             * @return {?}
             */
            function () {
                return this.minorVersion;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.minorVersion = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "Flags", {
            get: /**
             * @return {?}
             */
            function () {
                return this.flags;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.flags = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "PayloadBytes", {
            get: /**
             * @return {?}
             */
            function () {
                return this.payloadBytes;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.payloadBytes = value;
            },
            enumerable: true,
            configurable: true
        });
        return BlockStreamBlockDescriptor;
    }());
    modelstageweb.BlockStreamBlockDescriptor = BlockStreamBlockDescriptor;
    var BlockStreamReaderStates;
    (function (BlockStreamReaderStates) {
        BlockStreamReaderStates[BlockStreamReaderStates["FILE_HEADER_EXPECTED"] = 0] = "FILE_HEADER_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["BLOCK_DESCRIPTOR_EXPECTED"] = 1] = "BLOCK_DESCRIPTOR_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["PAYLOAD_EXPECTED"] = 2] = "PAYLOAD_EXPECTED";
    })(BlockStreamReaderStates = modelstageweb.BlockStreamReaderStates || (modelstageweb.BlockStreamReaderStates = {}));
    var BlockStreamReader = /** @class */ (function () {
        function BlockStreamReader(buffer) {
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
        Object.defineProperty(BlockStreamReader.prototype, "CurrentBlockDescriptor", {
            get: /**
             * @return {?}
             */
            function () {
                return this.currentBlockDescriptor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamReader.prototype, "FatalError", {
            get: /**
             * @return {?}
             */
            function () {
                return this.fatalError;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.remainingBytesInBlock = /**
         * @return {?}
         */
        function () {
            return this.blockEnd - this.currentPos;
        };
        /**
         * @param {?} count
         * @return {?}
         */
        BlockStreamReader.prototype.assureRemainingBytesInBlock = /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            return this.currentPos + count <= this.blockEnd;
        };
        /**
         * @param {?} count
         * @return {?}
         */
        BlockStreamReader.prototype.readBytes = /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            return this.arrayBuffer.slice(this.currentPos, this.currentPos + count);
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadInt16 = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(2);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256);
            }
            return result;
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadFloat = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(4);
            if (result) {
                /** @type {?} */
                var buf = new ArrayBuffer(4);
                /** @type {?} */
                var view = new DataView(buf);
                view.setUint8(0, this.byteArray[this.currentPos++]);
                view.setUint8(1, this.byteArray[this.currentPos++]);
                view.setUint8(2, this.byteArray[this.currentPos++]);
                view.setUint8(3, this.byteArray[this.currentPos++]);
                //let view = new DataView(this.byteArray.buffer, this.currentPos, 4);
                lambda(view.getFloat32(0, true));
                //this.currentPos += 4;
            }
            return result;
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadInt = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(4);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216);
            }
            return result;
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadInt64 = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(8);
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
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadString = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            var _this = this;
            /** @type {?} */
            var result = false;
            this.tryReadInt(function (stringLength) {
                /** @type {?} */
                var value = '';
                if (_this.assureRemainingBytesInBlock(stringLength)) {
                    for (var i = 0; i < stringLength; ++i) {
                        value += String.fromCharCode(_this.byteArray[_this.currentPos++]);
                    }
                }
                lambda(value);
                result = true;
            });
            return result;
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.readString = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = '';
            this.tryReadString(function (value) { result = value; });
            return result;
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.readMatrix4 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = new psgeometry.Matrix4();
            var _loop_1 = function (i) {
                this_1.tryReadFloat(function (val) { result.elements[i] = val; });
            };
            var this_1 = this;
            for (var i = 0; i < 16; ++i) {
                _loop_1(i);
            }
            return result.transpose();
        };
        /**
         * @private
         * @param {?} startPos
         * @param {?} length
         * @return {?}
         */
        BlockStreamReader.prototype.internalReadString = /**
         * @private
         * @param {?} startPos
         * @param {?} length
         * @return {?}
         */
        function (startPos, length) {
            /** @type {?} */
            var result = '';
            for (var i = 0; i < length; ++i) {
                result += String.fromCharCode(this.byteArray[startPos + i]);
            }
            return result;
        };
        /**
         * @private
         * @param {?} startPos
         * @return {?}
         */
        BlockStreamReader.prototype.internalReadInt = /**
         * @private
         * @param {?} startPos
         * @return {?}
         */
        function (startPos) {
            return this.byteArray[startPos] +
                this.byteArray[startPos + 1] * 256 +
                this.byteArray[startPos + 2] * 65536 +
                this.byteArray[startPos + 3] * 16777216;
        };
        /**
         * @private
         * @return {?}
         */
        BlockStreamReader.prototype.assureFileHeader = /**
         * @private
         * @return {?}
         */
        function () {
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
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.enterBlock = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = { success: false, descriptor: null };
            if (this.byteArray.byteLength >= this.currentPos + 5) {
                if (this.byteArray[this.currentPos] == 0x70 && // = "psbl"
                    this.byteArray[this.currentPos + 1] == 0x73 &&
                    this.byteArray[this.currentPos + 2] == 0x62 &&
                    this.byteArray[this.currentPos + 3] == 0x6C) {
                    /** @type {?} */
                    var blockTypeLength = this.byteArray[this.currentPos + 4];
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
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.leaveBlock = /**
         * @return {?}
         */
        function () {
            this.currentPos = this.blockEnd;
            this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
        };
        return BlockStreamReader;
    }());
    modelstageweb.BlockStreamReader = BlockStreamReader;
    var ShaderInstance = /** @class */ (function () {
        function ShaderInstance(shaderKey) {
            this.references = {};
            this.shaderKey = shaderKey;
        }
        Object.defineProperty(ShaderInstance.prototype, "FigureID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.figureID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.figureID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShaderInstance.prototype, "ShaderKey", {
            get: /**
             * @return {?}
             */
            function () {
                return this.shaderKey;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.shaderKey = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @return {?}
         */
        ShaderInstance.prototype.getReference = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.references[key];
        };
        /**
         * @param {?} reader
         * @return {?}
         */
        ShaderInstance.prototype.construct = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
        };
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        ShaderInstance.prototype.addReference = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            this.references[key] = value;
        };
        return ShaderInstance;
    }());
    modelstageweb.ShaderInstance = ShaderInstance;
    var MeshShaderInstance = /** @class */ (function (_super) {
        __extends(MeshShaderInstance, _super);
        function MeshShaderInstance(shaderKey) {
            var _this = _super.call(this, shaderKey) || this;
            _this.SIZE_OF_FLOAT = 4;
            return _this;
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        MeshShaderInstance.prototype.construct = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            var _this = this;
            if (!reader.tryReadString(function (id) { _this.bufferID = id; })) {
                this.bufferID = '_default';
            }
            if (!reader.tryReadInt16(function (priority) { _this.priority = priority; })) {
                this.priority = 0;
            }
        };
        /**
         * @return {?}
         */
        MeshShaderInstance.prototype.getStride = /**
         * @return {?}
         */
        function () {
            return this.ShaderKey == 'TransparentMeshShader' ? 10 * this.SIZE_OF_FLOAT : 9 * this.SIZE_OF_FLOAT;
        };
        return MeshShaderInstance;
    }(ShaderInstance));
    modelstageweb.MeshShaderInstance = MeshShaderInstance;
    var TexturedMeshShaderInstance = /** @class */ (function (_super) {
        __extends(TexturedMeshShaderInstance, _super);
        function TexturedMeshShaderInstance(shaderKey) {
            return _super.call(this, shaderKey) || this;
        }
        Object.defineProperty(TexturedMeshShaderInstance.prototype, "TextureID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.textureID;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} reader
         * @return {?}
         */
        TexturedMeshShaderInstance.prototype.construct = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            var _this = this;
            /** @type {?} */
            var result = reader.tryReadString(function (textureID) { _this.textureID = textureID; });
            if (result) {
                this.addReference('TextureBuffer', this.textureID);
                _super.prototype.construct.call(this, reader);
            }
        };
        /**
         * @return {?}
         */
        TexturedMeshShaderInstance.prototype.getStride = /**
         * @return {?}
         */
        function () {
            return 11 * this.SIZE_OF_FLOAT;
        };
        return TexturedMeshShaderInstance;
    }(MeshShaderInstance));
    modelstageweb.TexturedMeshShaderInstance = TexturedMeshShaderInstance;
    /**
     * @param {?} reader
     * @return {?}
     */
    function ShaderInstanceFromReader(reader) {
        /** @type {?} */
        var result = null;
        /** @type {?} */
        var shaderKey;
        if (reader.tryReadString(function (key) { shaderKey = key; })) {
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
    var Mesh3DLib = /** @class */ (function () {
        function Mesh3DLib(objectNamePrefix) {
            this.objectNamePrefix = objectNamePrefix;
        }
        /**
         * @param {?} rootNode
         * @return {?}
         */
        Mesh3DLib.prototype.setRootNode = /**
         * @param {?} rootNode
         * @return {?}
         */
        function (rootNode) {
            this.rootNode = rootNode;
        };
        /**
         * @param {?} path
         * @return {?}
         */
        Mesh3DLib.prototype.getNodeFromPath = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            if (path.length == 0 || !this.rootNode || this.rootNode.Name == path) {
                return this.rootNode;
            }
            else {
                return this.rootNode.getChildNodeFromPath(path.substr(this.rootNode.Name.length));
            }
        };
        return Mesh3DLib;
    }());
    modelstageweb.Mesh3DLib = Mesh3DLib;
    var AssetFactoryWebGL = /** @class */ (function () {
        function AssetFactoryWebGL(stage) {
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
        AssetFactoryWebGL.prototype.createFigure = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            var _this = this;
            this.currentFigure = new FigureWebGL(reader.readString());
            if (this.currentSceneMesh3DLib) {
                reader.tryReadString(function (nodePath) {
                    _this.currentFigure.Node = _this.currentSceneMesh3DLib.getNodeFromPath(nodePath);
                });
            }
            assetStore.addFigure(this.currentFigure);
            return true;
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createMesh = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            /** @type {?} */
            var result = false;
            this.currentShaderInstance = ShaderInstanceFromReader(reader);
            if (this.currentShaderInstance && this.currentFigure) {
                this.currentFigure.addShaderInstance(this.currentShaderInstance);
                result = true;
            }
            return result;
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createMeshBuffer = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            /** @type {?} */
            var bufferAsset = new BufferAssetWebGL(reader, 'VertexBuffer', false);
            /** @type {?} */
            var currentID = bufferAsset.BufferID;
            /** @type {?} */
            var counter = 1;
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
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createMeshIndicesBuffer = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            /** @type {?} */
            var bufferAsset = new BufferAssetWebGL(reader, 'IndexBuffer', true);
            /** @type {?} */
            var currentID = bufferAsset.BufferID;
            /** @type {?} */
            var counter = 1;
            while (assetStore.getBufferAsset(currentID)) {
                currentID = bufferAsset.BufferID + counter++;
            }
            bufferAsset.BufferID = currentID;
            assetStore.addBufferAsset(currentID, bufferAsset);
            bufferAsset.initialize(stage);
            if (this.currentShaderInstance) {
                this.currentShaderInstance.addReference('IndexBuffer', bufferAsset.BufferID);
            }
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createTexture = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        function (reader, stage, assetStore, deferreds) {
            var _this = this;
            /** @type {?} */
            var textureName;
            /** @type {?} */
            var pixelDataSize;
            if (reader.tryReadString(function (value) { textureName = value; }) && reader.tryReadInt64(function (value) { pixelDataSize = value; })) {
                /** @type {?} */
                var imageData = reader.readBytes(pixelDataSize);
                /** @type {?} */
                var extension = textureName.substr(textureName.lastIndexOf('.')).toLowerCase();
                /** @type {?} */
                var imageType = 'jpeg';
                if (extension == '.png') {
                    imageType = 'png';
                }
                /** @type {?} */
                var blob = new Blob([imageData], { 'type': 'image/' + imageType });
                /** @type {?} */
                var url = URL.createObjectURL(blob);
                /** @type {?} */
                var image_1 = new Image();
                /** @type {?} */
                var deferred_1 = JQuery.Deferred();
                deferreds.push(deferred_1);
                image_1.onload = function () {
                    _this.stage.AssetStore.addTextureAsset(textureName, new TextureAssetWebGL(_this.stage, image_1));
                    deferred_1.resolve();
                };
                image_1.onerror = function () {
                    console.error('Error processing texture blob ' + textureName);
                    deferred_1.reject();
                };
                image_1.src = url;
            }
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createOctree = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            this.currentFigure.setIntersector(Octree.CreateFromBlockStream(reader));
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createScene = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            this.currentSceneMesh3DLib = new Mesh3DLib(reader.readString());
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createRootNode = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            if (this.currentSceneMesh3DLib) {
                /** @type {?} */
                var rootNode = NodeAsset.FromBlockStream(reader, this.currentSceneMesh3DLib);
                this.currentSceneMesh3DLib.setRootNode(rootNode);
                this.stage.AssetStore.addRootNode(rootNode);
            }
        };
        /**
         * @private
         * @param {?} blockType
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        AssetFactoryWebGL.prototype.processBlock = /**
         * @private
         * @param {?} blockType
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        function (blockType, reader, stage, assetStore, deferreds) {
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
        };
        /**
         * @private
         * @param {?} buffer
         * @return {?}
         */
        AssetFactoryWebGL.prototype.loadFromArrayBuffer = /**
         * @private
         * @param {?} buffer
         * @return {?}
         */
        function (buffer) {
            /** @type {?} */
            var deferreds = [];
            /** @type {?} */
            var assetStore = this.stage.AssetStore;
            /** @type {?} */
            var reader = new BlockStreamReader(buffer);
            try {
                /** @type {?} */
                var res = reader.enterBlock();
                while (res.success) {
                    this.processBlock(res.descriptor.BlockType, reader, this.stage, assetStore, deferreds);
                    reader.leaveBlock();
                    res = reader.enterBlock();
                }
            }
            catch (error) {
                console.log(JSON.stringify(error));
            }
            return JQuery.when.apply(JQuery, deferreds);
        };
        /**
         * @param {?} url
         * @return {?}
         */
        AssetFactoryWebGL.prototype.getFromUrl = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            var _this = this;
            /** @type {?} */
            var deferred = JQuery.Deferred();
            /** @type {?} */
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.responseType = 'arraybuffer';
            req.onload = function (event) {
                _this.loadFromArrayBuffer((/** @type {?} */ (req.response))).done(function () {
                    deferred.resolve(true);
                });
            };
            req.onerror = function (event) {
                deferred.reject(event);
            };
            req.addEventListener('progress', function (oEvent) {
                if (oEvent.lengthComputable) {
                    /** @type {?} */
                    var percentComplete = oEvent.loaded / oEvent.total;
                    if (_this.lastPercentage != Math.floor(percentComplete * 100)) {
                        _this.lastPercentage = Math.floor(percentComplete * 100);
                        deferred.notify(Math.round(percentComplete * 100));
                    }
                }
            });
            req.send(null);
            return deferred;
        };
        return AssetFactoryWebGL;
    }());
    modelstageweb.AssetFactoryWebGL = AssetFactoryWebGL;
    /**
     * @record
     */
    function Intersector() { }
    modelstageweb.Intersector = Intersector;
    var BoundingBoxIntersector = /** @class */ (function () {
        function BoundingBoxIntersector(boundingBox) {
            this.boundingBox = boundingBox;
        }
        /**
         * @return {?}
         */
        BoundingBoxIntersector.prototype.getBoundingBox = /**
         * @return {?}
         */
        function () {
            return this.boundingBox;
        };
        return BoundingBoxIntersector;
    }());
    modelstageweb.BoundingBoxIntersector = BoundingBoxIntersector;
    var Octree = /** @class */ (function () {
        function Octree() {
            this.boundingBox = new psgeometry.AABB3D();
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        Octree.CreateFromBlockStream = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var octree = new Octree();
            /** @type {?} */
            var x0;
            /** @type {?} */
            var y0;
            /** @type {?} */
            var z0;
            /** @type {?} */
            var x1;
            /** @type {?} */
            var y1;
            /** @type {?} */
            var z1;
            if (reader.tryReadInt(function (val) { }) &&
                reader.tryReadFloat(function (val) { return x0 = val; }) &&
                reader.tryReadFloat(function (val) { return y0 = val; }) &&
                reader.tryReadFloat(function (val) { return z0 = val; }) &&
                reader.tryReadFloat(function (val) { return x1 = val; }) &&
                reader.tryReadFloat(function (val) { return y1 = val; }) &&
                reader.tryReadFloat(function (val) { return z1 = val; })) {
                octree.boundingBox.addPoint(x0, y0, z0);
                octree.boundingBox.addPoint(x1, y1, z1);
            }
            return octree;
        };
        /**
         * @return {?}
         */
        Octree.prototype.getBoundingBox = /**
         * @return {?}
         */
        function () {
            return this.boundingBox;
        };
        return Octree;
    }());
    modelstageweb.Octree = Octree;
    var FigureWebGL = /** @class */ (function () {
        function FigureWebGL(figureID) {
            this.shaderInstances = [];
            this.figureID = figureID;
        }
        Object.defineProperty(FigureWebGL.prototype, "Node", {
            get: /**
             * @return {?}
             */
            function () {
                return this.node;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.node = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FigureWebGL.prototype, "FigureID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.figureID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FigureWebGL.prototype, "ShaderInstances", {
            get: /**
             * @return {?}
             */
            function () {
                return this.shaderInstances;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        FigureWebGL.prototype.getBoundingBox = /**
         * @return {?}
         */
        function () {
            if (this.intersector) {
                return this.Node ? this.intersector.getBoundingBox().transform(this.Node.AbsoluteTransformation) : this.intersector.getBoundingBox();
            }
            else {
                return new psgeometry.AABB3D();
            }
        };
        /**
         * @param {?} shaderInstance
         * @return {?}
         */
        FigureWebGL.prototype.addShaderInstance = /**
         * @param {?} shaderInstance
         * @return {?}
         */
        function (shaderInstance) {
            this.shaderInstances.push(shaderInstance);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        FigureWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            var _this = this;
            /** @type {?} */
            var stage = context.Stage;
            this.shaderInstances.forEach(function (shaderInstance) {
                shaderInstance.FigureID = _this.figureID;
                /** @type {?} */
                var shaderProgram = stage.getShaderProgram(context, shaderInstance.ShaderKey);
                if (shaderProgram) {
                    context.ShaderProgram = shaderProgram;
                    context.NodeTransform = _this.Node ? _this.Node.AbsoluteTransformation : null;
                    shaderProgram.render(context, shaderInstance);
                }
            });
        };
        /**
         * @param {?} intersector
         * @return {?}
         */
        FigureWebGL.prototype.setIntersector = /**
         * @param {?} intersector
         * @return {?}
         */
        function (intersector) {
            this.intersector = intersector;
        };
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        FigureWebGL.prototype.intersectsBoundingBox = /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            /** @type {?} */
            var result = false;
            if (this.intersector) {
                /** @type {?} */
                var intersectionPoint = this.intersector.getBoundingBox().intersectsRay(ray);
                if (intersectionPoint) {
                    at.assignVec(intersectionPoint);
                    result = true;
                }
            }
            return result;
        };
        return FigureWebGL;
    }());
    modelstageweb.FigureWebGL = FigureWebGL;
    var AnimationTransformation = /** @class */ (function () {
        function AnimationTransformation() {
        }
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        AnimationTransformation.FromBlockStream = /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        function (reader, mesh3DLib) {
            return null;
        };
        return AnimationTransformation;
    }());
    modelstageweb.AnimationTransformation = AnimationTransformation;
    var NodeAsset = /** @class */ (function () {
        function NodeAsset() {
            this.childNodes = {};
        }
        Object.defineProperty(NodeAsset.prototype, "Name", {
            get: /**
             * @return {?}
             */
            function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeAsset.prototype, "AbsoluteTransformation", {
            get: /**
             * @return {?}
             */
            function () {
                return this.absoluteTransformation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeAsset.prototype, "LocalTransformation", {
            get: /**
             * @return {?}
             */
            function () {
                return this.localTransformation;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} path
         * @return {?}
         */
        NodeAsset.prototype.getChildNodeFromPath = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            for (var child in this.childNodes) {
                if (path == this.childNodes[child].Name) {
                    return this.childNodes[child];
                }
            }
            for (var child in this.childNodes) {
                if (path.substring(0, this.childNodes[child].Name.length) == this.childNodes[child].Name) {
                    return this.childNodes[child].getChildNodeFromPath(path.substr(this.childNodes[child].Name.length));
                }
            }
            return null;
        };
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @param {?=} parentNode
         * @return {?}
         */
        NodeAsset.FromBlockStream = /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @param {?=} parentNode
         * @return {?}
         */
        function (reader, mesh3DLib, parentNode) {
            /** @type {?} */
            var result = new NodeAsset();
            result.name = reader.readString();
            result.localTransformation = reader.readMatrix4();
            result.absoluteTransformation = NodeAsset.calculateAbsoluteTransformation(result.localTransformation, parentNode);
            result.parentNode = parentNode;
            result.readChildNodes(reader, mesh3DLib);
            result.readAnimationTransformations(reader, mesh3DLib);
            return result;
        };
        /**
         * @private
         * @param {?} localTransformation
         * @param {?} parentNode
         * @return {?}
         */
        NodeAsset.calculateAbsoluteTransformation = /**
         * @private
         * @param {?} localTransformation
         * @param {?} parentNode
         * @return {?}
         */
        function (localTransformation, parentNode) {
            if (parentNode) {
                return (/** @type {?} */ (localTransformation.multiply(parentNode.AbsoluteTransformation)));
            }
            else {
                return localTransformation;
            }
        };
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        NodeAsset.prototype.readChildNodes = /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        function (reader, mesh3DLib) {
            var _this = this;
            reader.tryReadInt(function (childNameCount) {
                for (var i = 0; i < childNameCount; ++i) {
                    _this.addChildNode(NodeAsset.FromBlockStream(reader, mesh3DLib, _this));
                }
            });
        };
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        NodeAsset.prototype.readAnimationTransformations = /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        function (reader, mesh3DLib) {
            var _this = this;
            reader.tryReadInt(function (numAnimationTransformations) {
                for (var i = 0; i < numAnimationTransformations; ++i) {
                    _this.addAnimationTransformation(AnimationTransformation.FromBlockStream(reader, mesh3DLib));
                }
            });
        };
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        NodeAsset.prototype.addChildNode = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.childNodes[node.Name] = node;
        };
        /**
         * @private
         * @param {?} animationTransformation
         * @return {?}
         */
        NodeAsset.prototype.addAnimationTransformation = /**
         * @private
         * @param {?} animationTransformation
         * @return {?}
         */
        function (animationTransformation) {
        };
        return NodeAsset;
    }());
    modelstageweb.NodeAsset = NodeAsset;
    var BufferAssetWebGL = /** @class */ (function () {
        function BufferAssetWebGL(reader, bufferID, isElementBuffer) {
            this.bufferSize = 0;
            this.isElementBuffer = false;
            this.bufferID = bufferID;
            this.isElementBuffer = isElementBuffer;
            if (reader) {
                /** @type {?} */
                var descriptor = reader.CurrentBlockDescriptor;
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
        Object.defineProperty(BufferAssetWebGL.prototype, "BufferID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.bufferID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.bufferID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAssetWebGL.prototype, "Buffer", {
            get: /**
             * @return {?}
             */
            function () {
                return this.webGLBuffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAssetWebGL.prototype, "BufferSize", {
            get: /**
             * @return {?}
             */
            function () {
                return this.bufferSize;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.bufferSize = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} stage
         * @return {?}
         */
        BufferAssetWebGL.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            this.webGLBuffer = stage.gl.createBuffer();
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ELEMENT_ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        BufferAssetWebGL.prototype.bind = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
            }
        };
        /**
         * @param {?} stage
         * @param {?} attributeLocation
         * @param {?} size
         * @param {?} stride
         * @param {?} offset
         * @return {?}
         */
        BufferAssetWebGL.prototype.bindInterleaved = /**
         * @param {?} stage
         * @param {?} attributeLocation
         * @param {?} size
         * @param {?} stride
         * @param {?} offset
         * @return {?}
         */
        function (stage, attributeLocation, size, stride, offset) {
            if (attributeLocation >= 0) {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.enableVertexAttribArray(attributeLocation);
                stage.gl.vertexAttribPointer(attributeLocation, size, stage.gl.FLOAT, false, stride, offset);
            }
        };
        return BufferAssetWebGL;
    }());
    modelstageweb.BufferAssetWebGL = BufferAssetWebGL;
    var OpaqueMeshBuilder = /** @class */ (function () {
        function OpaqueMeshBuilder() {
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
        OpaqueMeshBuilder.prototype.addTri = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, x1, y1, z1, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
            /** @type {?} */
            var i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (doubleSided) {
                this.vertices.push(x1, y1, z1, 0, 0, 1, r, g, b, x0, y0, z0, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
                i = this.indices.length;
                this.indices.push(i, i + 1, i + 2);
            }
        };
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
        OpaqueMeshBuilder.prototype.addQuad = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided);
        };
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
        OpaqueMeshBuilder.prototype.addStroke = /**
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
        function (x0, y0, z0, x1, y1, z1, r, g, b) {
            /** @type {?} */
            var dir = new psgeometry.Vec3(x1, y1, z1).sub(new psgeometry.Vec3(x0, y0, z0));
            /** @type {?} */
            var radius = dir.norm();
            /** @type {?} */
            var azimuth = Math.atan2(-dir.z, dir.x);
            /** @type {?} */
            var polar = Math.asin(dir.y / radius);
            /** @type {?} */
            var thickness = .01;
            /** @type {?} */
            var up = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, thickness, 0, 1))));
            /** @type {?} */
            var front = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, 0, thickness, 1))));
            this.addQuad(x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, r, g, b);
            this.addQuad(x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, r, g, b);
            this.addQuad(x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, r, g, b);
            this.addQuad(x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, r, g, b);
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        OpaqueMeshBuilder.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 9 * 4;
            /** @type {?} */
            var indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        };
        /**
         * @param {?} stage
         * @param {?} figureID
         * @return {?}
         */
        OpaqueMeshBuilder.prototype.createFigure = /**
         * @param {?} stage
         * @param {?} figureID
         * @return {?}
         */
        function (stage, figureID) {
            this.indBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_indices', true);
            this.vertBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_vertices', false);
            this.initialize(stage);
            stage.AssetStore.addBufferAsset(figureID + '_indices', this.indBufferAsset);
            stage.AssetStore.addBufferAsset(figureID + '_vertices', this.vertBufferAsset);
            /** @type {?} */
            var shaderInstance = new modelstageweb.MeshShaderInstance('OpaqueMeshShader');
            shaderInstance.addReference('IndexBuffer', figureID + '_indices');
            shaderInstance.addReference('VertexBuffer', figureID + '_vertices');
            /** @type {?} */
            var figure = new modelstageweb.FigureWebGL(figureID);
            figure.addShaderInstance(shaderInstance);
            return figure;
        };
        return OpaqueMeshBuilder;
    }());
    modelstageweb.OpaqueMeshBuilder = OpaqueMeshBuilder;
    var TransparentMeshBuilder = /** @class */ (function () {
        function TransparentMeshBuilder(vertBufferAsset, indBufferAsset) {
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
        TransparentMeshBuilder.prototype.addTri = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, a, x1, y1, z1, 0, 0, 1, r, g, b, a, x2, y2, z2, 0, 0, 1, r, g, b, a);
            /** @type {?} */
            var i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, x2, y2, z2, x1, y1, z1, r, g, b, a);
            }
        };
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
        TransparentMeshBuilder.prototype.addQuad = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided);
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        TransparentMeshBuilder.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 10 * 4;
            /** @type {?} */
            var indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        };
        return TransparentMeshBuilder;
    }());
    modelstageweb.TransparentMeshBuilder = TransparentMeshBuilder;
    var TexturedMeshBuilder = /** @class */ (function () {
        function TexturedMeshBuilder(vertBufferAsset, indBufferAsset) {
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
        TexturedMeshBuilder.prototype.addTri = /**
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
        function (x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, u0, v0, x1, y1, z1, 0, 0, 1, r, g, b, u1, v1, x2, y2, z2, 0, 0, 1, r, g, b, u2, v2);
            /** @type {?} */
            var i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x1, y1, z1, u1, v1, r, g, b);
            }
        };
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
        TexturedMeshBuilder.prototype.addQuad = /**
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
        function (x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided) {
            this.addTri(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided);
            this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided);
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        TexturedMeshBuilder.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 11 * 4;
            /** @type {?} */
            var indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        };
        return TexturedMeshBuilder;
    }());
    modelstageweb.TexturedMeshBuilder = TexturedMeshBuilder;
    var TextureAssetWebGL = /** @class */ (function () {
        function TextureAssetWebGL(stage, image) {
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
        TextureAssetWebGL.prototype.bind = /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        function (stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.uniform1i(stage.gl.getUniformLocation(program.Program, attributeName), 0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
        };
        /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        TextureAssetWebGL.prototype.unbind = /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        function (stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
        };
        return TextureAssetWebGL;
    }());
    modelstageweb.TextureAssetWebGL = TextureAssetWebGL;
    /// An asset store class for WebGL.
    var 
    /// An asset store class for WebGL.
    AssetStoreWebGL = /** @class */ (function () {
        function AssetStoreWebGL() {
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
        /// Adds the specified figure to the the store.
        /**
         * @param {?} figure
         * @return {?}
         */
        AssetStoreWebGL.prototype.addFigure = 
        /// Adds the specified figure to the the store.
        /**
         * @param {?} figure
         * @return {?}
         */
        function (figure) {
            this.figures[figure.FigureID] = figure;
        };
        /// Determines the figure with the the specified id.
        /// Determines the figure with the the specified id.
        /**
         * @param {?} figureID
         * @return {?}
         */
        AssetStoreWebGL.prototype.getFigure = 
        /// Determines the figure with the the specified id.
        /**
         * @param {?} figureID
         * @return {?}
         */
        function (figureID) {
            return this.figures[figureID];
        };
        /// Adds a buffer asset to the store.
        /// Adds a buffer asset to the store.
        /**
         * @param {?} bufferAssetID
         * @param {?} bufferAsset
         * @return {?}
         */
        AssetStoreWebGL.prototype.addBufferAsset = 
        /// Adds a buffer asset to the store.
        /**
         * @param {?} bufferAssetID
         * @param {?} bufferAsset
         * @return {?}
         */
        function (bufferAssetID, bufferAsset) {
            this.bufferAssets[bufferAssetID] = bufferAsset;
        };
        /**
         * @param {?} node
         * @return {?}
         */
        AssetStoreWebGL.prototype.addRootNode = /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.rootNodeAssets[node.Name] = node;
        };
        /// Determines the buffer asset with the specified id.
        /// Determines the buffer asset with the specified id.
        /**
         * @param {?} bufferAssetID
         * @return {?}
         */
        AssetStoreWebGL.prototype.getBufferAsset = 
        /// Determines the buffer asset with the specified id.
        /**
         * @param {?} bufferAssetID
         * @return {?}
         */
        function (bufferAssetID) {
            return this.bufferAssets[bufferAssetID];
        };
        /// Adds a texture asset to the store.
        /// Adds a texture asset to the store.
        /**
         * @param {?} textureAssetID
         * @param {?} textureAsset
         * @return {?}
         */
        AssetStoreWebGL.prototype.addTextureAsset = 
        /// Adds a texture asset to the store.
        /**
         * @param {?} textureAssetID
         * @param {?} textureAsset
         * @return {?}
         */
        function (textureAssetID, textureAsset) {
            this.textureAssets[textureAssetID] = textureAsset;
        };
        /// Determines the texture asset with the specified id.
        /// Determines the texture asset with the specified id.
        /**
         * @param {?} textureAssetID
         * @return {?}
         */
        AssetStoreWebGL.prototype.getTextureAsset = 
        /// Determines the texture asset with the specified id.
        /**
         * @param {?} textureAssetID
         * @return {?}
         */
        function (textureAssetID) {
            return this.textureAssets[textureAssetID];
        };
        Object.defineProperty(AssetStoreWebGL.prototype, "Figures", {
            /// Returns the map of aggregated figures.
            get: 
            /// Returns the map of aggregated figures.
            /**
             * @return {?}
             */
            function () {
                return this.figures;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} name
         * @return {?}
         */
        AssetStoreWebGL.prototype.getRootNode = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.rootNodeAssets[name];
        };
        return AssetStoreWebGL;
    }());
    modelstageweb.AssetStoreWebGL = AssetStoreWebGL;
    /**
     * @record
     */
    function SceneItemFilterWebGL() { }
    modelstageweb.SceneItemFilterWebGL = SceneItemFilterWebGL;
    var GenericSceneItemFilterWebGL = /** @class */ (function () {
        function GenericSceneItemFilterWebGL() {
        }
        /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        GenericSceneItemFilterWebGL.prototype.passes = /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        function (sceneItem, context) {
            return context.Phase != 'Shadow';
        };
        return GenericSceneItemFilterWebGL;
    }());
    modelstageweb.GenericSceneItemFilterWebGL = GenericSceneItemFilterWebGL;
    var SceneItemWebGL = /** @class */ (function () {
        function SceneItemWebGL(scene, sceneItemID, isVisible, testIntersection, childrenVisible, testChildrenIntersection) {
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
        Object.defineProperty(SceneItemWebGL.prototype, "Data", {
            get: /**
             * @return {?}
             */
            function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "Scene", {
            get: /**
             * @return {?}
             */
            function () {
                return this.scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "SceneItemID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.sceneItemID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "Children", {
            get: /**
             * @return {?}
             */
            function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "TestChildrenIntersection", {
            get: /**
             * @return {?}
             */
            function () {
                return this.testChildrenIntersection;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.testChildrenIntersection = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "TestIntersection", {
            get: /**
             * @return {?}
             */
            function () {
                return this.testIntersection;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.testIntersection = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "Filter", {
            get: /**
             * @return {?}
             */
            function () { return this.filter; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.filter = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} sceneItem
         * @return {?}
         */
        SceneItemWebGL.prototype.addChild = /**
         * @param {?} sceneItem
         * @return {?}
         */
        function (sceneItem) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.push(sceneItem);
            sceneItem.addedToSceneGraph(this);
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneItemWebGL.prototype.getChild = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            return this.childrenByKey[sceneItemID];
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneItemWebGL.prototype.removeChild = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            this.children = this.children.filter(function (sceneItem) { return sceneItem.sceneItemID != sceneItemID; });
            delete this.childrenByKey[sceneItemID];
        };
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @return {?}
         */
        SceneItemWebGL.prototype.insertChild = /**
         * @param {?} sceneItem
         * @param {?} index
         * @return {?}
         */
        function (sceneItem, index) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.splice(index, 0, sceneItem);
            sceneItem.addedToSceneGraph(this);
        };
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.beginRender = /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        function (context) {
        };
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.endRender = /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        function (context) {
        };
        /**
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
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
        };
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.renderChildren = /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        function (context) {
            if (this.childrenVisible) {
                this.children.forEach(function (child) {
                    child.render(context);
                });
            }
        };
        /**
         * @param {?} parentSceneItem
         * @return {?}
         */
        SceneItemWebGL.prototype.addedToSceneGraph = /**
         * @param {?} parentSceneItem
         * @return {?}
         */
        function (parentSceneItem) {
            this.scene = parentSceneItem.scene;
            this.parent = parentSceneItem;
        };
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        SceneItemWebGL.prototype.intersectsBoundingBox = /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            return false;
        };
        /**
         * @protected
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        SceneItemWebGL.prototype.isIntersectionCandidate = /**
         * @protected
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            return this.intersectsBoundingBox(ray, at);
        };
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        SceneItemWebGL.prototype.addIntersectionCandidates = /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        function (ray, candidates) {
            if (this.testIntersection) {
                /** @type {?} */
                var at = new psgeometry.Vec3();
                if (this.isIntersectionCandidate(ray, at)) {
                    candidates.push(new IntersectionCandidate(this, at.squaredDist(ray.p0.asVec3())));
                }
            }
            if (this.testChildrenIntersection) {
                for (var i in this.children) {
                    this.children[i].addIntersectionCandidates(ray, candidates);
                }
            }
        };
        return SceneItemWebGL;
    }());
    modelstageweb.SceneItemWebGL = SceneItemWebGL;
    var ActorWebGL = /** @class */ (function (_super) {
        __extends(ActorWebGL, _super);
        function ActorWebGL(scene, actorID) {
            var _this = _super.call(this, scene, actorID) || this;
            _this.figures = [];
            _this.state = new RenderState();
            return _this;
        }
        Object.defineProperty(ActorWebGL.prototype, "State", {
            get: /**
             * @return {?}
             */
            function () {
                return this.state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorWebGL.prototype, "Figures", {
            get: /**
             * @return {?}
             */
            function () {
                return this.figures;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} figure
         * @return {?}
         */
        ActorWebGL.prototype.addFigure = /**
         * @param {?} figure
         * @return {?}
         */
        function (figure) {
            this.figures.push(figure);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        ActorWebGL.prototype.beginRender = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            this.figures.forEach(function (figure) {
                figure.render(context);
            });
        };
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        ActorWebGL.prototype.intersectsBoundingBox = /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            /** @type {?} */
            var transformedRay = this.inverseModelTransform ? ray.transform(this.inverseModelTransform) : ray;
            /** @type {?} */
            var result = false;
            for (var figureIdx in this.figures) {
                if (!result) {
                    result = this.figures[figureIdx].intersectsBoundingBox(transformedRay, at);
                    if (result) {
                        at.assignVec((/** @type {?} */ (this.lastModelTransform.multiply(at.asVec4()))));
                    }
                }
            }
            return result;
        };
        /**
         * @param {?} context
         * @return {?}
         */
        ActorWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
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
                    var modelTransform = context.NodeTransform ? (/** @type {?} */ (context.NodeTransform.multiply(context.ModelTransform))) : context.ModelTransform;
                    if (!modelTransform.equals(this.lastModelTransform)) {
                        this.inverseModelTransform = modelTransform.inverse();
                        this.lastModelTransform = modelTransform;
                    }
                    context.popState();
                }
            }
        };
        return ActorWebGL;
    }(SceneItemWebGL));
    modelstageweb.ActorWebGL = ActorWebGL;
    var IntersectionCandidate = /** @class */ (function () {
        function IntersectionCandidate(sceneItem, squaredDist) {
            this.squaredDist = Infinity;
            this.sceneItem = sceneItem;
            this.squaredDist = squaredDist;
        }
        /**
         * @param {?} intersectionCandidate
         * @return {?}
         */
        IntersectionCandidate.prototype.compare = /**
         * @param {?} intersectionCandidate
         * @return {?}
         */
        function (intersectionCandidate) {
            return this.squaredDist < intersectionCandidate.squaredDist ? -1 :
                (this.squaredDist > intersectionCandidate.squaredDist ? 1 : 0);
        };
        return IntersectionCandidate;
    }());
    modelstageweb.IntersectionCandidate = IntersectionCandidate;
    var RenderState = /** @class */ (function () {
        function RenderState() {
            this.entries = {};
        }
        Object.defineProperty(RenderState.prototype, "Parent", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.parent = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        RenderState.prototype.evaluate = /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            return typeof entry == 'function' ? entry(this) : entry;
        };
        /**
         * @param {?} key
         * @return {?}
         */
        RenderState.prototype.contains = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.entries[key] != undefined;
        };
        /**
         * @template T
         * @param {?} key
         * @param {?} defaultValue
         * @return {?}
         */
        RenderState.prototype.get = /**
         * @template T
         * @param {?} key
         * @param {?} defaultValue
         * @return {?}
         */
        function (key, defaultValue) {
            /** @type {?} */
            var result = defaultValue;
            this.tryGet(key, function (val) { result = val; });
            return result;
        };
        /**
         * @param {?} key
         * @param {?} lambda
         * @return {?}
         */
        RenderState.prototype.tryGet = /**
         * @param {?} key
         * @param {?} lambda
         * @return {?}
         */
        function (key, lambda) {
            if (this.contains(key)) {
                lambda(this.evaluate(this.entries[key]));
                return true;
            }
            else {
                return this.parent == null ? false : this.parent.tryGet(key, lambda);
            }
        };
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        RenderState.prototype.set = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            this.entries[key] = value;
        };
        return RenderState;
    }());
    modelstageweb.RenderState = RenderState;
    var SceneWebGL = /** @class */ (function () {
        function SceneWebGL() {
            this.isInitialized = false;
            this.sceneHierarchy = new SceneItemWebGL(this, '');
            this.dirty = true;
            this.state = new RenderState();
        }
        Object.defineProperty(SceneWebGL.prototype, "SceneHierarchy", {
            get: /**
             * @return {?}
             */
            function () {
                return this.sceneHierarchy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneWebGL.prototype, "IsInitialized", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isInitialized;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.isInitialized = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneWebGL.prototype, "State", {
            get: /**
             * @return {?}
             */
            function () {
                return this.state;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SceneWebGL.prototype.initialize = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.setDirty = /**
         * @return {?}
         */
        function () {
            this.dirty = true;
        };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} context
         * @return {?}
         */
        SceneWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            if (this.isInitialized) {
                context.SceneCategory = this.getSceneCategory();
                // updateRunningSequences(context);
                context.pushState(this.state);
                this.sceneHierarchy.render(context);
                context.popState();
            }
        };
        /**
         * @param {?} sceneItem
         * @param {?} makeVisible
         * @return {?}
         */
        SceneWebGL.prototype.addSceneItem = /**
         * @param {?} sceneItem
         * @param {?} makeVisible
         * @return {?}
         */
        function (sceneItem, makeVisible) {
            this.sceneHierarchy.addChild(sceneItem);
            this.setDirty();
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneWebGL.prototype.getSceneItem = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            return this.sceneHierarchy.getChild(sceneItemID);
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneWebGL.prototype.removeSceneItem = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            this.sceneHierarchy.removeChild(sceneItemID);
            this.setDirty();
        };
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @param {?} makeVisible
         * @return {?}
         */
        SceneWebGL.prototype.insertSceneItem = /**
         * @param {?} sceneItem
         * @param {?} index
         * @param {?} makeVisible
         * @return {?}
         */
        function (sceneItem, index, makeVisible) {
            this.sceneHierarchy.insertChild(sceneItem, index);
            this.setDirty();
        };
        /**
         * @protected
         * @return {?}
         */
        SceneWebGL.prototype.getSceneCategory = /**
         * @protected
         * @return {?}
         */
        function () {
            return '';
        };
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        SceneWebGL.prototype.getIntersectionCandidates = /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        function (ray, candidates) {
            this.sceneHierarchy.addIntersectionCandidates(ray, candidates);
            candidates.sort(function (a, b) { return a.compare(b); });
        };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.beginFrame = /**
         * @return {?}
         */
        function () { };
        /** Update is called periodically (once per frame) to allow updating the state of the scene.
          */
        /**
         * Update is called periodically (once per frame) to allow updating the state of the scene.
         * @return {?}
         */
        SceneWebGL.prototype.update = /**
         * Update is called periodically (once per frame) to allow updating the state of the scene.
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.endFrame = /**
         * @return {?}
         */
        function () { };
        return SceneWebGL;
    }());
    modelstageweb.SceneWebGL = SceneWebGL;
    var Camera = /** @class */ (function () {
        function Camera() {
            this.dirty = true;
        }
        Object.defineProperty(Camera.prototype, "ProjectionMatrix", {
            get: /**
             * @return {?}
             */
            function () { return this.projectionMatrix; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "ViewMatrix", {
            get: /**
             * @return {?}
             */
            function () { return this.viewMatrix; },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @return {?}
         */
        Camera.prototype.setDirty = /**
         * @protected
         * @return {?}
         */
        function () {
            this.dirty = true;
        };
        /**
         * @return {?}
         */
        Camera.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} eye
         * @param {?} center
         * @param {?} up
         * @return {?}
         */
        Camera.prototype.createViewMatrix = /**
         * @param {?} eye
         * @param {?} center
         * @param {?} up
         * @return {?}
         */
        function (eye, center, up) {
            /** @type {?} */
            var z = eye.sub(center).normalize();
            /** @type {?} */
            var x = up.cross(z).normalize();
            /** @type {?} */
            var y = z.cross(x).normalize();
            /** @type {?} */
            var m = new psgeometry.Matrix4([x.x, x.y, x.z, 0,
                y.x, y.y, y.z, 0,
                z.x, z.y, z.z, 0,
                0, 0, 0, 1]);
            /** @type {?} */
            var t = new psgeometry.Matrix4([1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1]);
            return (/** @type {?} */ (t.multiply(m)));
        };
        /**
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        Camera.prototype.createPerspectiveMatrix = /**
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
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} near
         * @param {?} far
         * @return {?}
         */
        Camera.prototype.createOrthographicMatrix = /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} near
         * @param {?} far
         * @return {?}
         */
        function (left, right, bottom, top, near, far) {
            return new psgeometry.Matrix4([
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, 2 / (near - far), 0,
                (left + right) / (left - right),
                (bottom + top) / (bottom - top),
                (near + far) / (near - far),
                1,
            ]);
        };
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        Camera.prototype.makeFrustum = /**
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
            var X = 2 * znear / (right - left);
            /** @type {?} */
            var Y = 2 * znear / (top - bottom);
            /** @type {?} */
            var A = (right + left) / (right - left);
            /** @type {?} */
            var B = (top + bottom) / (top - bottom);
            /** @type {?} */
            var C = -(zfar + znear) / (zfar - znear);
            /** @type {?} */
            var D = -2 * zfar * znear / (zfar - znear);
            return new psgeometry.Matrix4([
                X, 0, A, 0,
                0, Y, B, 0,
                0, 0, C, D,
                0, 0, -1, 0
            ]);
        };
        return Camera;
    }());
    modelstageweb.Camera = Camera;
    var ShadowCameraWebGL = /** @class */ (function (_super) {
        __extends(ShadowCameraWebGL, _super);
        function ShadowCameraWebGL() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shadowMapWidth = 1024;
            _this.shadowMapHeight = 1024;
            return _this;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        ShadowCameraWebGL.prototype.resize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.update(new psgeometry.Vec3(0, 10, 0), new psgeometry.Vec3(0, 0, 0), new psgeometry.Vec3(0, 0, -1));
            this.shadowFramebuffer = stage.gl.createFramebuffer();
            this.shadowDepthTexture = stage.gl.createTexture();
            this.renderBuffer = stage.gl.createRenderbuffer();
            /** @type {?} */
            var shadowTexture = new TextureAssetWebGL(stage, this.shadowDepthTexture);
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
        };
        /**
         * @param {?} bbox
         * @return {?}
         */
        ShadowCameraWebGL.prototype.updateShadowArea = /**
         * @param {?} bbox
         * @return {?}
         */
        function (bbox) {
            /** @type {?} */
            var center = bbox.center();
            /** @type {?} */
            var extents = bbox.extents();
            this.projectionMatrix = this.createOrthographicMatrix(-extents.x / 2, extents.x / 2, -extents.y / 2, extents.y / 2, -30, 30);
            this.update(new psgeometry.Vec3(center.x, 10, center.y), new psgeometry.Vec3(center.x, 0, center.y), new psgeometry.Vec3(0, 0, -1));
            this.setDirty();
        };
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        ShadowCameraWebGL.prototype.update = /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        function (pos, lookAt, up) {
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.setDirty();
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        ShadowCameraWebGL.prototype.beginRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
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
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        ShadowCameraWebGL.prototype.endRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
        };
        return ShadowCameraWebGL;
    }(Camera));
    modelstageweb.ShadowCameraWebGL = ShadowCameraWebGL;
    var CameraWebGL = /** @class */ (function (_super) {
        __extends(CameraWebGL, _super);
        function CameraWebGL() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clientWidth = 1.0;
            _this.clientHeight = 1.0;
            return _this;
        }
        Object.defineProperty(CameraWebGL.prototype, "ProjectionMatrix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.projectionMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraWebGL.prototype, "ViewMatrix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.viewMatrix;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} stage
         * @return {?}
         */
        CameraWebGL.prototype.resize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var realToCSSPixels = window.devicePixelRatio || 1;
            this.clientWidth = stage.gl.canvas.clientWidth;
            this.clientHeight = stage.gl.canvas.clientHeight;
            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            /** @type {?} */
            var displayWidth = Math.floor(stage.gl.canvas.clientWidth * realToCSSPixels);
            /** @type {?} */
            var displayHeight = Math.floor(stage.gl.canvas.clientHeight * realToCSSPixels);
            // Make the canvas the same size
            stage.gl.canvas.width = displayWidth / realToCSSPixels;
            stage.gl.canvas.height = displayHeight / realToCSSPixels;
            this.projectionMatrix = this.createPerspectiveMatrix(45.0, stage.gl.canvas.clientWidth / stage.gl.canvas.clientHeight, 0.1, 200.0);
            //this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.inverseProjectionMatrix = this.projectionMatrix.inverse();
            //this.viewMatrix = this.createViewMatrix(new psgeometry.Vec3(0.0, 1.8, 15.0), new psgeometry.Vec3(0.0, 0.0, 0.0), new psgeometry.Vec3(0.0, 1.0, 0.0));
            this.setDirty();
        };
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        CameraWebGL.prototype.update = /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        function (pos, lookAt, up) {
            this.currentCameraPos = pos;
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.inverseViewMatrix = this.viewMatrix.inverse();
            this.setDirty();
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        CameraWebGL.prototype.beginRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
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
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        CameraWebGL.prototype.endRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
        };
        /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        CameraWebGL.prototype.getViewRay = /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        function (clientX, clientY) {
            /** @type {?} */
            var cursor = new psgeometry.Vec4(clientX / this.clientWidth * 2.0 - 1.0, 1.0 - clientY / this.clientHeight * 2.0, -1.0, 1.0);
            /** @type {?} */
            var direction = (/** @type {?} */ (this.inverseProjectionMatrix.multiply(cursor)));
            direction.w = 1.0;
            /** @type {?} */
            var forward = this.inverseViewMatrix.multiply(direction);
            return new psgeometry.Line3D(this.currentCameraPos, forward);
        };
        return CameraWebGL;
    }(Camera));
    modelstageweb.CameraWebGL = CameraWebGL;
    var ShaderProgramWebGL = /** @class */ (function () {
        function ShaderProgramWebGL() {
            this.isInitialized = false;
            this.SIZE_OF_FLOAT = 4;
        }
        Object.defineProperty(ShaderProgramWebGL.prototype, "Program", {
            get: /**
             * @return {?}
             */
            function () {
                return this.program;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.render = /**
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            if (this.isInitialized && this.beginRender(context, shaderInstance)) {
                context.Stage.applyState(context);
                this.internalRender(context, shaderInstance);
                this.endRender(context, shaderInstance);
            }
        };
        /**
         * @protected
         * @param {?} stage
         * @param {?} attribName
         * @return {?}
         */
        ShaderProgramWebGL.prototype.getAttribLocation = /**
         * @protected
         * @param {?} stage
         * @param {?} attribName
         * @return {?}
         */
        function (stage, attribName) {
            return stage.gl.getAttribLocation(this.program, attribName);
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.beginRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            context.Stage.gl.useProgram(this.program);
            return true;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.endRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        ShaderProgramWebGL.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
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
        };
        /**
         * @return {?}
         */
        ShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return '';
        };
        /**
         * @return {?}
         */
        ShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return '';
        };
        return ShaderProgramWebGL;
    }());
    modelstageweb.ShaderProgramWebGL = ShaderProgramWebGL;
    var OpaqueMeshShaderProgramWebGL = /** @class */ (function (_super) {
        __extends(OpaqueMeshShaderProgramWebGL, _super);
        function OpaqueMeshShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 9;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                // draw triangles
                /** @type {?} */
                var triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        };
        /**
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n\n                varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n                   vec3 normal = aNormal;\n                   vec4 diffuseColor = vec4(aColor, 1.0);\n                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n                   vec3 lightDir = vec3(0.9, 0.7, 1.0);\n                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);\n\n                   vColor = vec4((aColor * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), 1.0);\n                }";
        };
        /**
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return "varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_FragColor = vColor;\n                }";
        };
        return OpaqueMeshShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.OpaqueMeshShaderProgramWebGL = OpaqueMeshShaderProgramWebGL;
    var TransparentMeshShaderProgramWebGL = /** @class */ (function (_super) {
        __extends(TransparentMeshShaderProgramWebGL, _super);
        function TransparentMeshShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 10;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
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
                var triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                stage.gl.depthMask(true);
                stage.gl.disable(stage.gl.BLEND);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        };
        /**
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec4 aColor;\n\n                varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n                   vec3 normal = aNormal;\n                   vec4 diffuseColor = aColor;\n                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n                   vec3 lightDir = vec3(0.9, 0.7, 1.0);\n                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);\n\n                   vColor = vec4((aColor.rgb * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), aColor.a);\n                }";
        };
        /**
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return "varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_FragColor = vColor;\n                }";
        };
        return TransparentMeshShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.TransparentMeshShaderProgramWebGL = TransparentMeshShaderProgramWebGL;
    var TexturedMeshShaderProgramVariants;
    (function (TexturedMeshShaderProgramVariants) {
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Diffuse"] = 0] = "Diffuse";
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Matcap"] = 1] = "Matcap";
    })(TexturedMeshShaderProgramVariants = modelstageweb.TexturedMeshShaderProgramVariants || (modelstageweb.TexturedMeshShaderProgramVariants = {}));
    var TexturedMeshShaderProgramWebGL = /** @class */ (function (_super) {
        __extends(TexturedMeshShaderProgramWebGL, _super);
        function TexturedMeshShaderProgramWebGL(variant) {
            if (variant === void 0) { variant = TexturedMeshShaderProgramVariants.Diffuse; }
            var _this = _super.call(this) || this;
            _this.variant = variant;
            return _this;
        }
        /**
         * @protected
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 11;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                var textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                var textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    // draw triangles
                    /** @type {?} */
                    var triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        };
        /**
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n                attribute vec2 aTextureCoords;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n                varying mediump float vLightIntensity;\n\n                void main()\n                {\n                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);\n                   gl_Position = uPMatrix * uVMatrix * pos;\n                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;\n\n                   vec3 lightDir = vec3(0.9, 0.7, 1.0);\n                   vLightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);\n\n                   vColor = vec4(aColor, 1.0);\n";
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        "vTextureCoords = aTextureCoords;\n";
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        "vec3 e = normalize(pos.xyz);\n\t                 vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);\n\t                 mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));\n\t                 vTextureCoords = r.xy / m + .5;\n";
                    break;
            }
            result += "}";
            return result;
        };
        /**
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform sampler2D uTexture0;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n                varying mediump float vLightIntensity;\n\n                void main()\n                {\n            \t    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));\n";
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        "gl_FragColor = vec4(clamp(texColor.xyz * (1.0 + .15 * vLightIntensity), 0.0, 1.0), texColor.a); \n            ";
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        "gl_FragColor = texColor.a;   \n";
                    break;
            }
            result += "}";
            return result;
        };
        return TexturedMeshShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.TexturedMeshShaderProgramWebGL = TexturedMeshShaderProgramWebGL;
    var ShadowTexturedMeshShaderProgramWebGL = /** @class */ (function (_super) {
        __extends(ShadowTexturedMeshShaderProgramWebGL, _super);
        function ShadowTexturedMeshShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        ShadowTexturedMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n                attribute vec2 aTextureCoords;\n\n                varying mediump float height;\n\n                void main()\n                {\n                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n                   height = (uMMatrix * vec4(aPosition, 1.0)).y;\n                }";
        };
        /**
         * @return {?}
         */
        ShadowTexturedMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform sampler2D uTexture0;\n                varying mediump float height;\n\n\n                void main()\n                {\n                    gl_FragColor = vec4(.2, .2, .2, clamp(1.0 - (height / 3.0), 0.0, 1.0)); \n                }";
        };
        return ShadowTexturedMeshShaderProgramWebGL;
    }(TexturedMeshShaderProgramWebGL));
    modelstageweb.ShadowTexturedMeshShaderProgramWebGL = ShadowTexturedMeshShaderProgramWebGL;
    var MatCapShaderProgramWebGL = /** @class */ (function (_super) {
        __extends(MatCapShaderProgramWebGL, _super);
        function MatCapShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 11;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                var textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                var textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    /** @type {?} */
                    var color = context.State.get('Color', psgeometry.Vec4.One);
                    /** @type {?} */
                    var uColorLoc = stage.gl.getUniformLocation(this.program, 'uColor');
                    stage.gl.uniform4fv(uColorLoc, color.elements());
                    // draw triangles
                    /** @type {?} */
                    var triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
            }
        };
        /**
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n                attribute vec2 aTextureCoords;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n\n                void main()\n                {\n                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);\n                   gl_Position = uPMatrix * uVMatrix * pos;\n                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;\n\n                   vec3 e = normalize(pos.xyz);\n\t               vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);\n\t               mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));\n\t               vTextureCoords = r.xy / m + .5;\n                }";
            return result;
        };
        /**
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform sampler2D uTexture0;\n                uniform mediump vec4 uColor;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n\n                void main()\n                {\n            \t    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));\n                    //mediump vec3 green = vec3(0, 0.44, 0.09);\n                    //mediump vec3 green = vec3(0.69, 0.34, 0.00);  //or\n                    //mediump vec3 green = vec3(0.02, 0.31, 0.06);  // g\n                    //mediump vec3 green = vec3(0.31, 0.02, 0.06);  // r\n                    //mediump vec3 green = vec3(0.02, 0.17, 0.31);  // b\n                    mediump float colorFac = (texColor.x - texColor.y) / 0.65;\n                    mediump float whiteFac = (1.0 - colorFac) * 0.75;\n                    mediump vec3 color = vec3(whiteFac, whiteFac, whiteFac) + colorFac * uColor.rgb;\n\n                    gl_FragColor = vec4(color, texColor.a * uColor.a);   \n            }";
            return result;
        };
        return MatCapShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.MatCapShaderProgramWebGL = MatCapShaderProgramWebGL;
    var RenderStateStack = /** @class */ (function () {
        function RenderStateStack() {
            this.modelTransform = [psgeometry.Matrix4.Identity];
            this.stack = [];
        }
        Object.defineProperty(RenderStateStack.prototype, "Top", {
            /** Top of the state stack.
              */
            get: /**
             * Top of the state stack.
             * @return {?}
             */
            function () {
                return this.stack[this.stack.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderStateStack.prototype, "CurrentModelTransform", {
            /** Determines the current model transformation.
              */
            get: /**
             * Determines the current model transformation.
             * @return {?}
             */
            function () {
                return this.modelTransform[this.modelTransform.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        /** Pushes the specified state on the state stack.
          */
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        RenderStateStack.prototype.pushState = /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        function (state) {
            state.Parent = this.stack.length == 0 ? null : this.Top;
            this.stack.push(state);
            if (state.contains('ModelTransform')) {
                /** @type {?} */
                var modelTransform = state.get('ModelTransform', psgeometry.Matrix4.Identity);
                this.modelTransform.push((/** @type {?} */ (this.CurrentModelTransform.multiply(modelTransform))));
            }
            else {
                this.modelTransform.push(this.CurrentModelTransform);
            }
        };
        /** Removes the top element from the state stack.
          */
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        RenderStateStack.prototype.popState = /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        function () {
            this.Top.Parent = null;
            this.stack.pop();
            this.modelTransform.pop();
        };
        return RenderStateStack;
    }());
    /**
     * A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
     *
     * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
     * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
     * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
     * also by previously traversed SceneItems in the scene hierarchy.
     */
    var /**
     * A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
     *
     * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
     * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
     * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
     * also by previously traversed SceneItems in the scene hierarchy.
     */
    RenderContextWebGL = /** @class */ (function () {
        function RenderContextWebGL() {
            this.sceneCategory = '';
            this.stateStack = new RenderStateStack();
            this.modelTransform = null;
            this.nodeTransform = null;
            this.phase = '';
        }
        Object.defineProperty(RenderContextWebGL.prototype, "Phase", {
            get: /**
             * @return {?}
             */
            function () { return this.phase; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.phase = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "State", {
            /** Returns the current state that is composed of previously set state values.
              */
            get: /**
             * Returns the current state that is composed of previously set state values.
             * @return {?}
             */
            function () {
                return this.stateStack.Top;
            },
            enumerable: true,
            configurable: true
        });
        /** Pushes the specified state on the state stack.
          */
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        RenderContextWebGL.prototype.pushState = /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        function (state) {
            this.stateStack.pushState(state);
        };
        /** Removes the top element from the state stack.
          */
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        RenderContextWebGL.prototype.popState = /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        function () {
            this.stateStack.popState();
        };
        Object.defineProperty(RenderContextWebGL.prototype, "ModelTransform", {
            get: /**
             * @return {?}
             */
            function () {
                return this.stateStack.CurrentModelTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "SceneCategory", {
            /** The current scene's category.
              */
            get: /**
             * The current scene's category.
             * @return {?}
             */
            function () {
                return this.sceneCategory;
            },
            /** The current scene's category.
              */
            set: /**
             * The current scene's category.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.sceneCategory = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "Stage", {
            /** The stage the SceneItems are being rendered to.
              */
            get: /**
             * The stage the SceneItems are being rendered to.
             * @return {?}
             */
            function () {
                return this.stage;
            },
            /** The stage the SceneItems are being rendered to.
              */
            set: /**
             * The stage the SceneItems are being rendered to.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.stage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "Camera", {
            get: /**
             * @return {?}
             */
            function () {
                return this.camera;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.camera = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "ShaderProgram", {
            /** The current shader program.
              */
            get: /**
             * The current shader program.
             * @return {?}
             */
            function () {
                return this.shaderProgram;
            },
            /** The current shader program.
              */
            set: /**
             * The current shader program.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.shaderProgram = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "NodeTransform", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nodeTransform;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.nodeTransform = value;
            },
            enumerable: true,
            configurable: true
        });
        return RenderContextWebGL;
    }());
    modelstageweb.RenderContextWebGL = RenderContextWebGL;
    var StageWebGL = /** @class */ (function () {
        function StageWebGL(canvasElementId) {
            var _this = this;
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
                    var ext = this.gl.getExtension('OES_element_index_uint');
                    window.addEventListener('resize', function () {
                        _this.resize();
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
        Object.defineProperty(StageWebGL.prototype, "Canvas", {
            get: /**
             * @return {?}
             */
            function () {
                return this.canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "Camera", {
            get: /**
             * @return {?}
             */
            function () {
                return this.camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "Tools", {
            get: /**
             * @return {?}
             */
            function () {
                return this.tools;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "AssetFactory", {
            get: /**
             * @return {?}
             */
            function () {
                return this.assetFactory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "AssetStore", {
            get: /**
             * @return {?}
             */
            function () {
                return this.assetStore;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        StageWebGL.prototype.initialize = /**
         * @return {?}
         */
        function () {
            this.shadowCamera = new ShadowCameraWebGL();
            this.shadowCamera.resize(this);
            this.camera = new CameraWebGL();
            this.camera.resize(this);
            this.resize();
        };
        /**
         * @param {?} box
         * @return {?}
         */
        StageWebGL.prototype.updateShadowArea = /**
         * @param {?} box
         * @return {?}
         */
        function (box) {
            this.shadowCamera.updateShadowArea(box);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        StageWebGL.prototype.applyState = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            /** @type {?} */
            var program = context.ShaderProgram.Program;
            /** @type {?} */
            var resultingModelTransformation = psgeometry.Matrix4.Identity;
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
            var mMatrixLoc = this.gl.getUniformLocation(program, 'uMMatrix');
            this.gl.uniformMatrix4fv(mMatrixLoc, false, resultingModelTransformation.transpose().elements);
            /** @type {?} */
            var vMatrixLoc = this.gl.getUniformLocation(program, 'uVMatrix');
            this.gl.uniformMatrix4fv(vMatrixLoc, false, context.Camera.ViewMatrix.transpose().elements);
            /** @type {?} */
            var pMatrixLoc = this.gl.getUniformLocation(program, 'uPMatrix');
            this.gl.uniformMatrix4fv(pMatrixLoc, false, context.Camera.ProjectionMatrix.transpose().elements);
        };
        /**
         * @param {?} scene
         * @return {?}
         */
        StageWebGL.prototype.render = /**
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
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
        };
        /**
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        StageWebGL.prototype.registerShaderProgram = /**
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        function (shaderProgramKey, shaderProgram) {
            this.shaderPrograms[shaderProgramKey] = shaderProgram;
        };
        /**
         * @param {?} phaseKey
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        StageWebGL.prototype.registerPhaseSpecificShaderProgram = /**
         * @param {?} phaseKey
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        function (phaseKey, shaderProgramKey, shaderProgram) {
            /** @type {?} */
            var phase = this.phaseSpecificShaderPrograms[phaseKey];
            if (!phase) {
                phase = {};
                this.phaseSpecificShaderPrograms[phaseKey] = phase;
            }
            phase[shaderProgramKey] = shaderProgram;
        };
        /**
         * @param {?} context
         * @param {?} shaderProgramKey
         * @return {?}
         */
        StageWebGL.prototype.getShaderProgram = /**
         * @param {?} context
         * @param {?} shaderProgramKey
         * @return {?}
         */
        function (context, shaderProgramKey) {
            /** @type {?} */
            var result;
            if (context.phase) {
                /** @type {?} */
                var phase = this.phaseSpecificShaderPrograms[context.phase];
                if (phase) {
                    result = phase[shaderProgramKey];
                }
            }
            return result || this.shaderPrograms[shaderProgramKey];
        };
        /**
         * @private
         * @return {?}
         */
        StageWebGL.prototype.resize = /**
         * @private
         * @return {?}
         */
        function () {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
            this.camera.resize(this);
        };
        return StageWebGL;
    }());
    modelstageweb.StageWebGL = StageWebGL;
    var ConnectionState;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["Ready"] = 0] = "Ready";
        ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
        ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
        ConnectionState[ConnectionState["Error"] = 3] = "Error";
    })(ConnectionState = modelstageweb.ConnectionState || (modelstageweb.ConnectionState = {}));
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ServerConnection = /** @class */ (function () {
        function ServerConnection() {
            this.state = ConnectionState.Ready;
        }
        Object.defineProperty(ServerConnection.prototype, "IsConnected", {
            get: /**
             * @return {?}
             */
            function () {
                return this.state == ConnectionState.Connected;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} callback
         * @return {?}
         */
        ServerConnection.prototype.onMessage = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            this.handleMessage = callback;
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        ServerConnection.prototype.onConnected = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            this.handleConnected = callback;
        };
        return ServerConnection;
    }());
    modelstageweb.ServerConnection = ServerConnection;
    var SignalRServerConnection = /** @class */ (function (_super) {
        __extends(SignalRServerConnection, _super);
        function SignalRServerConnection() {
            var _this = _super.call(this) || this;
            _this.connection = new HubConnectionBuilder()
                .withUrl('/api/state')
                .configureLogging(LogLevel.Trace)
                //.withHubProtocol(<any>(new MessagePackHubProtocol()))
                .build();
            _this.connection.on('msg', function (data) {
                if (_this.handleMessage) {
                    /** @type {?} */
                    var msg = new MessageEvent('binary', { data: data });
                    _this.handleMessage(msg);
                }
            });
            return _this;
        }
        /**
         * @return {?}
         */
        SignalRServerConnection.prototype.connect = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.state = ConnectionState.Connecting;
            this.connection.start()
                .then(function () {
                if (_this.handleConnected) {
                    _this.state = ConnectionState.Connected;
                    _this.handleConnected(new Event('connected'));
                }
            })
                .catch(function (e) {
                _this.state = ConnectionState.Error;
            });
        };
        /**
         * @return {?}
         */
        SignalRServerConnection.prototype.disconnect = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.connection.stop()
                .then(function () {
                _this.state = ConnectionState.Ready;
            })
                .catch(function () {
                _this.state = ConnectionState.Error;
            });
        };
        /**
         * @param {?} data
         * @return {?}
         */
        SignalRServerConnection.prototype.send = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.connection.invoke('Msg', data);
        };
        return SignalRServerConnection;
    }(ServerConnection));
    modelstageweb.SignalRServerConnection = SignalRServerConnection;
    var WebSocketServerConnection = /** @class */ (function (_super) {
        __extends(WebSocketServerConnection, _super);
        function WebSocketServerConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?=} url
         * @return {?}
         */
        WebSocketServerConnection.prototype.connect = /**
         * @param {?=} url
         * @return {?}
         */
        function (url) {
            var _this = this;
            if (this.state == ConnectionState.Ready || this.state == ConnectionState.Error) {
                /** @type {?} */
                var uri = url ? url : 'ws://' + window.location.host + '/api/scene';
                this.state = ConnectionState.Connecting;
                this.websocket = new WebSocket(uri);
                this.websocket.binaryType = 'arraybuffer';
                this.websocket.onopen = function (event) {
                    _this.state = ConnectionState.Connected;
                    console.log('websocket connected.');
                    if (_this.handleConnected) {
                        _this.handleConnected(event);
                    }
                };
                this.websocket.onclose = function (event) {
                    console.log('websocket closed.');
                    _this.state = ConnectionState.Ready;
                };
                this.websocket.onerror = function (event) {
                    _this.state = ConnectionState.Error;
                    console.log('websocket error.');
                };
                this.websocket.onmessage = function (event) {
                    if (_this.handleMessage) {
                        _this.handleMessage(event);
                    }
                };
            }
        };
        /**
         * @return {?}
         */
        WebSocketServerConnection.prototype.disconnect = /**
         * @return {?}
         */
        function () {
            this.websocket.close();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        WebSocketServerConnection.prototype.send = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.websocket.send(data);
        };
        return WebSocketServerConnection;
    }(ServerConnection));
    modelstageweb.WebSocketServerConnection = WebSocketServerConnection;
    var Tool = /** @class */ (function () {
        function Tool() {
        }
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        Tool.prototype.enter = /**
         * @param {?} interfaceController
         * @return {?}
         */
        function (interfaceController) {
            this.interfaceController = interfaceController;
        };
        /**
         * @return {?}
         */
        Tool.prototype.leave = /**
         * @return {?}
         */
        function () { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleKeyUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { return false; };
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        Tool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleMouseDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { };
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        Tool.prototype.handleDrag = /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, startX, startY, dX, dY) { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleMouseWheel = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { };
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        Tool.prototype.handleClick = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) { };
        return Tool;
    }());
    modelstageweb.Tool = Tool;
    var InterfaceController = /** @class */ (function () {
        function InterfaceController() {
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
        InterfaceController.prototype.hasTool = /**
         * @private
         * @return {?}
         */
        function () {
            return this.tools.length > 0;
        };
        Object.defineProperty(InterfaceController.prototype, "CurrentTool", {
            get: /**
             * @return {?}
             */
            function () {
                return this.hasTool() ? this.tools[this.tools.length - 1] : null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} target
         * @return {?}
         */
        InterfaceController.prototype.bindEvents = /**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            var _this = this;
            this.target = target;
            JQuery(target).on('mousewheel', function (e) {
                _this.mouseWheel(e);
            });
            JQuery(target).on('mousedown touchstart', function (e) {
                _this.mouseDown(e);
                e.preventDefault();
            });
            if (!((/** @type {?} */ (target))).setCapture) {
                JQuery(document).on('mousemove touchmove', function (e) {
                    _this.mouseMove(e);
                });
            }
            else {
                JQuery(target).on('mousemove touchmove', function (e) {
                    _this.mouseMove(e);
                });
            }
            JQuery(document).on('mouseup touchend touchcancel', function (e) {
                _this.mouseUp(e);
                e.preventDefault();
            });
            JQuery(target).on('losecapture', function (e) {
                _this.mouseUp(e);
                e.preventDefault();
            });
            JQuery(document).on('keyup', function (e) {
                if (_this.keyUp(e)) {
                    e.preventDefault();
                }
            });
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.updateLastPosition = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        };
        /**
         * @param {?} tool
         * @return {?}
         */
        InterfaceController.prototype.pushTool = /**
         * @param {?} tool
         * @return {?}
         */
        function (tool) {
            if (this.CurrentTool) {
                this.CurrentTool.leave();
            }
            this.tools.push(tool);
            tool.enter(this);
        };
        /**
         * @return {?}
         */
        InterfaceController.prototype.popTool = /**
         * @return {?}
         */
        function () {
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].leave();
                this.tools.pop();
            }
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].enter(this);
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.keyUp = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.hasTool()) {
                return this.CurrentTool.handleKeyUp(e);
            }
            else {
                return false;
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseDown = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.button == this.leftButton) {
                this.leftButtonDown = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.updateLastPosition(e);
                if (((/** @type {?} */ (e.target))).setCapture)
                    ((/** @type {?} */ (e.target))).setCapture();
            }
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseDown(e);
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseMove = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseUp = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var updatePosition = false;
            if (e.button == this.leftButton) {
                this.leftButtonDown = false;
                updatePosition = true;
                if (((/** @type {?} */ (e.target))).releaseCapture)
                    ((/** @type {?} */ (e.target))).releaseCapture();
            }
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseUp(e);
            }
            else {
                if (updatePosition) {
                    this.updateLastPosition(e);
                }
            }
        };
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        InterfaceController.prototype.drag = /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, dX, dY) {
            if (this.onDrag) {
                this.onDrag(e, dX, dY);
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseWheel = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseWheel(e);
            }
            else {
                if (this.onMouseWheel) {
                    this.onMouseWheel(e);
                }
                e.preventDefault();
            }
        };
        return InterfaceController;
    }());
    modelstageweb.InterfaceController = InterfaceController;
    var CameraController = /** @class */ (function () {
        function CameraController(stage, camera, interfaceController, connection) {
            var _this = this;
            this.radius = 20.0;
            this.yaw = 0.0;
            this.pitch = 0.0;
            this.dragDivisor = 100.0;
            this.rotateDivisor = 200.0;
            this.stage = stage;
            this.camera = camera;
            this.connection = connection;
            interfaceController.bindEvents(JQuery(stage.Canvas));
            interfaceController.onDrag = function (e, dX, dY) {
                _this.drag(e, dX, dY);
            };
            interfaceController.onMouseWheel = function (e) {
                _this.mouseWheel(e);
            };
            interfaceController.onMove = function (e, x, y) {
                _this.move(e, x, y);
            };
            this.center = new psgeometry.Vec3(0.0, 0.0, 0.0);
            this.updateCamera();
        }
        Object.defineProperty(CameraController.prototype, "Yaw", {
            get: /**
             * @return {?}
             */
            function () {
                return this.yaw;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.yaw = value;
                this.updateCamera();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} radius
         * @param {?} pitch
         * @param {?} yaw
         * @return {?}
         */
        CameraController.prototype.construct = /**
         * @param {?} radius
         * @param {?} pitch
         * @param {?} yaw
         * @return {?}
         */
        function (radius, pitch, yaw) {
            this.radius = radius;
            this.pitch = pitch;
            this.yaw = yaw;
            this.updateCamera();
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        CameraController.prototype.mouseWheel = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.shiftKey) {
                /** @type {?} */
                var d = this.getViewDir().multiply(((/** @type {?} */ (e))).deltaY || ((/** @type {?} */ (e))).deltaX);
                this.center = this.center.sub(d);
            }
            else {
                this.radius += ((/** @type {?} */ (e))).deltaY * Math.log(this.radius + 1) / 2;
                this.radius = Math.max(0.01, this.radius);
            }
            this.updateCamera();
        };
        /**
         * @private
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        CameraController.prototype.move = /**
         * @private
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
        };
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        CameraController.prototype.drag = /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, dX, dY) {
            if (e.shiftKey) {
                /** @type {?} */
                var x = this.getViewPlaneX();
                /** @type {?} */
                var y = this.getViewPlaneY();
                this.center = this.center
                    .add(x.multiply(dX / this.dragDivisor))
                    .add(y.multiply(dY / this.dragDivisor));
            }
            else {
                this.yaw -= dX / this.rotateDivisor;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch - dY / this.rotateDivisor));
            }
            this.updateCamera();
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getViewPlaneX = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(-1.0, 0.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getViewPlaneY = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(0.0, 1.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getViewDir = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(0.0, 0.0, -1.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getCameraPos = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(0.0, 0.0, this.radius);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.updateCamera = /**
         * @private
         * @return {?}
         */
        function () {
            this.camera.update(this.getCameraPos(), this.center, new psgeometry.Vec3(0.0, 1.0, 0.0));
        };
        return CameraController;
    }());
    modelstageweb.CameraController = CameraController;
    var CommonMessageTypes = /** @class */ (function () {
        function CommonMessageTypes() {
        }
        CommonMessageTypes.AppStateDelta = 0x0100;
        CommonMessageTypes.ServerHandshake = 0x0101;
        CommonMessageTypes.ClientHandshake = 0x0102;
        CommonMessageTypes.ClientConfirmation = 0x0103;
        CommonMessageTypes.AppStateInitialization = 0x104;
        CommonMessageTypes.AnchorRequest = 0x01fe;
        CommonMessageTypes.SharedAnchor = 0x01ff;
        return CommonMessageTypes;
    }());
    modelstageweb.CommonMessageTypes = CommonMessageTypes;
    var NetworkChannelMessage = /** @class */ (function () {
        function NetworkChannelMessage() {
            this.messageType = CommonMessageTypes.AppStateDelta;
        }
        Object.defineProperty(NetworkChannelMessage.prototype, "Content", {
            get: /**
             * @return {?}
             */
            function () {
                return this.content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkChannelMessage.prototype, "MessageType", {
            get: /**
             * @return {?}
             */
            function () {
                return this.messageType;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} buffer
         * @return {?}
         */
        NetworkChannelMessage.FromBuffer = /**
         * @param {?} buffer
         * @return {?}
         */
        function (buffer) {
            /** @type {?} */
            var result = new NetworkChannelMessage();
            result.content = buffer;
            return result;
        };
        Object.defineProperty(NetworkChannelMessage.prototype, "HasPayload", {
            get: /**
             * @return {?}
             */
            function () {
                return this.content.byteLength > NetworkChannelMessage.HeaderSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkChannelMessage.prototype, "PayloadSize", {
            get: /**
             * @return {?}
             */
            function () {
                return this.content.byteLength - NetworkChannelMessage.HeaderSize;
            },
            enumerable: true,
            configurable: true
        });
        NetworkChannelMessage.HeaderSize = 8;
        return NetworkChannelMessage;
    }());
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
    var /**
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
    AppStateBase = /** @class */ (function () {
        function AppStateBase() {
            this.clusterManagers = {};
        }
        Object.defineProperty(AppStateBase.prototype, "LocalPeerID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.localPeerID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.localPeerID = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @return {?}
         */
        AppStateBase.prototype.getClusterManager = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.clusterManagers[key];
        };
        /** Adds a certain cluster type (global/local, single/multi) to the app state.
          */
        /**
         * Adds a certain cluster type (global/local, single/multi) to the app state.
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        AppStateBase.prototype.addCluster = /**
         * Adds a certain cluster type (global/local, single/multi) to the app state.
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        function (key, cluster) {
            this.clusterManagers[key] = cluster;
        };
        /** Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
          * during the transactional phase of the app state.
          */
        /**
         * Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
         * during the transactional phase of the app state.
         * @return {?}
         */
        AppStateBase.prototype.beginTransaction = /**
         * Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
         * during the transactional phase of the app state.
         * @return {?}
         */
        function () {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].beginTransaction();
            }
        };
        /** Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        /**
         * Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        AppStateBase.prototype.endTransaction = /**
         * Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        function () {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].endTransaction();
            }
        };
        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
          * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
          */
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
         * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
         * @param {?} scene
         * @return {?}
         */
        AppStateBase.prototype.applyChanges = /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
         * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].applyChanges(scene);
            }
        };
        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @return {?}
         */
        AppStateBase.prototype.serializeTransaction = /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @return {?}
         */
        function (deltaWriter) {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].serializeTransaction(deltaWriter, clusterManagerKey, this);
            }
        };
        /** Retrieves all remote operations that have been received from remote peers.
          */
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} scene
         * @return {?}
         */
        AppStateBase.prototype.deserializeTransaction = /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, scene) {
            /** @type {?} */
            var success = true;
            while (!deltaReader.isAtEnd() && success) {
                /** @type {?} */
                var clusterID = deltaReader.readClusterID();
                if (clusterID) {
                    /** @type {?} */
                    var clusterManager = this.clusterManagers[clusterID];
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
        };
        return AppStateBase;
    }());
    modelstageappstate.AppStateBase = AppStateBase;
    var AppState = /** @class */ (function (_super) {
        __extends(AppState, _super);
        function AppState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        AppState.GetInstance = /**
         * @return {?}
         */
        function () {
            if (!AppState.Instance) {
                AppState.Instance = new AppState();
            }
            return AppState.Instance;
        };
        AppState.Instance = null;
        return AppState;
    }(AppStateBase));
    modelstageappstate.AppState = AppState;
    var BinaryWriter = /** @class */ (function () {
        function BinaryWriter() {
            this.buf = [];
        }
        /**
         * @return {?}
         */
        BinaryWriter.prototype.flush = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = new Uint8Array(this.buf.length);
            result.set(this.buf);
            return result;
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeByte = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeInt16 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeUInt16 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeInt32 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeInt64 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff, (val >> 32) & 0xff, (val >> 40) & 0xff, (val >> 48) & 0xff, (val >> 56) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeTimestamp = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.writeInt64(val);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeFloat32 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var buf = new ArrayBuffer(4);
            /** @type {?} */
            var view = new DataView(buf);
            view.setFloat32(0, val, true);
            /** @type {?} */
            var byteBuf = new Int8Array(buf);
            this.buf.push.apply(byteBuf);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeString = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.writeInt32(val.length);
            this.writeCharArray(val, val.length);
        };
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        BinaryWriter.prototype.writeCharArray = /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        function (val, arrayLength) {
            for (var idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) : 0x00);
            }
        };
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        BinaryWriter.prototype.writeWideCharArray = /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        function (val, arrayLength) {
            for (var idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) & 0xff : 0x00, idx < val.length ? (val.charCodeAt(idx) >> 8) & 0xff : 0x00);
            }
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeVec3 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var buf = new ArrayBuffer(12);
            /** @type {?} */
            var view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            /** @type {?} */
            var byteBuf = new Uint8Array(buf);
            this.buf.push.apply(byteBuf);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeVec4 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var buf = new ArrayBuffer(16);
            /** @type {?} */
            var view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            view.setFloat32(12, val.w, true);
            /** @type {?} */
            var byteBuf = new Uint8Array(buf);
            this.buf.push(byteBuf[0], byteBuf[1], byteBuf[2], byteBuf[3], byteBuf[4], byteBuf[5], byteBuf[6], byteBuf[7], byteBuf[8], byteBuf[9], byteBuf[10], byteBuf[11], byteBuf[12], byteBuf[13], byteBuf[14], byteBuf[15]);
        };
        return BinaryWriter;
    }());
    modelstageappstate.BinaryWriter = BinaryWriter;
    var BinaryReader = /** @class */ (function () {
        function BinaryReader(buf) {
            this.currentPos = 8;
            this.error = false;
            this.buf = buf;
        }
        Object.defineProperty(BinaryReader.prototype, "Error", {
            get: /**
             * @return {?}
             */
            function () {
                return this.error;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinaryReader.prototype, "AtEnd", {
            get: /**
             * @return {?}
             */
            function () {
                return this.currentPos >= this.buf.byteLength;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} count
         * @return {?}
         */
        BinaryReader.prototype.assureRemainingBytes = /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            return this.currentPos + count <= this.buf.byteLength;
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readByte = /**
         * @return {?}
         */
        function () {
            if (this.assureRemainingBytes(1)) {
                return this.buf[this.currentPos++];
            }
            else {
                this.error = true;
                return NaN;
            }
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readUInt16 = /**
         * @return {?}
         */
        function () {
            if (this.assureRemainingBytes(2)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256;
            }
            else {
                this.error = true;
                return NaN;
            }
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readUInt64 = /**
         * @return {?}
         */
        function () {
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readUInt32 = /**
         * @return {?}
         */
        function () {
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readString = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = null;
            /** @type {?} */
            var length = this.readUInt32();
            if (!this.error) {
                if (this.assureRemainingBytes(length)) {
                    result = this.readCharArray(length);
                }
                else {
                    this.error = true;
                }
            }
            return result;
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readTimestamp = /**
         * @return {?}
         */
        function () {
            return this.readUInt64();
        };
        /**
         * @param {?} arrayLength
         * @return {?}
         */
        BinaryReader.prototype.readCharArray = /**
         * @param {?} arrayLength
         * @return {?}
         */
        function (arrayLength) {
            /** @type {?} */
            var result = [];
            /** @type {?} */
            var idx = 0;
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readFloat32 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = NaN;
            if (this.assureRemainingBytes(4)) {
                /** @type {?} */
                var buf = new ArrayBuffer(4);
                /** @type {?} */
                var view = new DataView(buf);
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readVec3 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = null;
            if (this.assureRemainingBytes(12)) {
                /** @type {?} */
                var buf = new ArrayBuffer(12);
                /** @type {?} */
                var view = new DataView(buf);
                for (var i = 0; i < 12; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec3(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true));
            }
            else {
                this.error = true;
            }
            return result;
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readVec4 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = null;
            if (this.assureRemainingBytes(16)) {
                /** @type {?} */
                var buf = new ArrayBuffer(16);
                /** @type {?} */
                var view = new DataView(buf);
                for (var i = 0; i < 16; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec4(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true), view.getFloat32(12, true));
            }
            else {
                this.error = true;
            }
            return result;
        };
        return BinaryReader;
    }());
    modelstageappstate.BinaryReader = BinaryReader;
    var AppStateDeltaReader = /** @class */ (function () {
        function AppStateDeltaReader(reader) {
            this.isInitializing = false;
            this.reader = reader;
        }
        Object.defineProperty(AppStateDeltaReader.prototype, "Reader", {
            get: /**
             * @return {?}
             */
            function () {
                return this.reader;
            },
            enumerable: true,
            configurable: true
        });
        /** Indicates if there is data left to process.
          */
        /**
         * Indicates if there is data left to process.
         * @return {?}
         */
        AppStateDeltaReader.prototype.isAtEnd = /**
         * Indicates if there is data left to process.
         * @return {?}
         */
        function () { return this.reader.AtEnd; };
        /** Reads the cluster ID from the data.
          */
        /**
         * Reads the cluster ID from the data.
         * @return {?}
         */
        AppStateDeltaReader.prototype.readClusterID = /**
         * Reads the cluster ID from the data.
         * @return {?}
         */
        function () {
            return this.reader.readString();
        };
        Object.defineProperty(AppStateDeltaReader.prototype, "IsInitializing", {
            /** Indicates if the message is an initialization message rather than a "normal" delta package.
              * This can be evaluated by the cluster to handle initialization different from updating.
              */
            get: /**
             * Indicates if the message is an initialization message rather than a "normal" delta package.
             * This can be evaluated by the cluster to handle initialization different from updating.
             * @return {?}
             */
            function () {
                return this.isInitializing;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateDeltaReader;
    }());
    modelstageappstate.AppStateDeltaReader = AppStateDeltaReader;
    var AppStateDeltaWriter = /** @class */ (function () {
        function AppStateDeltaWriter(writer) {
            this.writer = writer;
        }
        Object.defineProperty(AppStateDeltaWriter.prototype, "Writer", {
            get: /**
             * @return {?}
             */
            function () {
                return this.writer;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateDeltaWriter;
    }());
    modelstageappstate.AppStateDeltaWriter = AppStateDeltaWriter;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    AppStateEntry = /** @class */ (function () {
        function AppStateEntry() {
            this.transactional = false;
        }
        Object.defineProperty(AppStateEntry.prototype, "AppState", {
            get: /**
             * @return {?}
             */
            function () {
                return this.appState;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.appState = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        AppStateEntry.prototype.register = /**
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        function (key, cluster) {
            this.key = key;
            this.cluster = cluster;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.reconcile = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.setDirty = /**
         * @return {?}
         */
        function () {
            this.cluster.setDirty();
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            //assert(!m_isTransactional);
            this.transactional = true;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.endTransaction = /**
         * @return {?}
         */
        function () {
            //assert(m_isTransactional);
            this.transactional = false;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.isTransactional = /**
         * @return {?}
         */
        function () {
            return this.transactional;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.isLocked = /**
         * @return {?}
         */
        function () {
            return this.cluster.IsLocked;
        };
        return AppStateEntry;
    }());
    modelstageappstate.AppStateEntry = AppStateEntry;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    CommonAppStateEntry = /** @class */ (function (_super) {
        __extends(CommonAppStateEntry, _super);
        function CommonAppStateEntry() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.changedAt = 0;
            return _this;
        }
        /**
         * @return {?}
         */
        CommonAppStateEntry.prototype.beginChanging = /**
         * @return {?}
         */
        function () {
            this.changedAt = Date.now();
            this.setDirty();
        };
        return CommonAppStateEntry;
    }(AppStateEntry));
    modelstageappstate.CommonAppStateEntry = CommonAppStateEntry;
    var AppStateStringValue = /** @class */ (function (_super) {
        __extends(AppStateStringValue, _super);
        function AppStateStringValue() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dirty = false;
            return _this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        AppStateStringValue.prototype.set = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value != this.value) {
                this.changing();
                this.value = value;
            }
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.get = /**
         * @return {?}
         */
        function () {
            return this.value;
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.getPreviousValue = /**
         * @return {?}
         */
        function () {
            return this.previousValue;
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.changing = /**
         * @return {?}
         */
        function () {
            //assert(IsTransactional());
            if (!this.dirty && !this.isLocked()) {
                this.beginChanging();
                this.previousValue = this.value;
                this.dirty = true;
            }
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.dirty;
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            _super.prototype.beginTransaction.call(this);
            this.dirty = false;
        };
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateStringValue.prototype.deserializeDelta = /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        function (reader, key) {
            /** @type {?} */
            var result = false;
            // key was read by cluster
            /** @type {?} */
            var changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                var prevValue = reader.Reader.readString();
                if (prevValue != null) {
                    this.value = reader.Reader.readString();
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        };
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateStringValue.prototype.serializeDelta = /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        function (writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeString(this.previousValue);
            writer.Writer.writeString(this.value);
        };
        return AppStateStringValue;
    }(CommonAppStateEntry));
    modelstageappstate.AppStateStringValue = AppStateStringValue;
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    AppStateValue = /** @class */ (function (_super) {
        __extends(AppStateValue, _super);
        function AppStateValue() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dirty = false;
            return _this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        AppStateValue.prototype.set = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
        };
        /**
         * @return {?}
         */
        AppStateValue.prototype.get = /**
         * @return {?}
         */
        function () {
            return this.value;
        };
        /**
         * @return {?}
         */
        AppStateValue.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.dirty;
        };
        /**
         * @return {?}
         */
        AppStateValue.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            _super.prototype.beginTransaction.call(this);
            this.dirty = false;
        };
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateValue.prototype.deserializeDelta = /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        function (reader, key) {
            /** @type {?} */
            var result = false;
            // key was read by cluster
            /** @type {?} */
            var changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                var prevValue = this.readValue(reader);
                if (prevValue != null) {
                    this.value = this.readValue(reader);
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        };
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateValue.prototype.serializeDelta = /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        function (writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            this.writeValue(writer, this.previousValue);
            this.writeValue(writer, this.value);
        };
        return AppStateValue;
    }(CommonAppStateEntry));
    modelstageappstate.AppStateValue = AppStateValue;
    var AppStateBoolValue = /** @class */ (function (_super) {
        __extends(AppStateBoolValue, _super);
        function AppStateBoolValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateBoolValue.prototype.readValue = /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var result = false;
            if (reader.Reader.assureRemainingBytes(1)) {
                result = reader.Reader.readByte() != 0;
            }
            return result;
        };
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateBoolValue.prototype.writeValue = /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (writer, value) {
            writer.Writer.writeByte(value ? 0xff : 0);
        };
        return AppStateBoolValue;
    }(AppStateValue));
    modelstageappstate.AppStateBoolValue = AppStateBoolValue;
    var AppStateVector4Value = /** @class */ (function (_super) {
        __extends(AppStateVector4Value, _super);
        function AppStateVector4Value() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateVector4Value.prototype.readValue = /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var result = null;
            // sizeof(float) * (x,y,z,w)
            if (reader.Reader.assureRemainingBytes(4 * 4)) {
                result = new psgeometry.Vec4();
                result.x = reader.Reader.readFloat32();
                result.y = reader.Reader.readFloat32();
                result.z = reader.Reader.readFloat32();
                result.w = reader.Reader.readFloat32();
            }
            return result;
        };
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateVector4Value.prototype.writeValue = /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (writer, value) {
            writer.Writer.writeFloat32(value.x);
            writer.Writer.writeFloat32(value.y);
            writer.Writer.writeFloat32(value.z);
            writer.Writer.writeFloat32(value.w);
        };
        return AppStateVector4Value;
    }(AppStateValue));
    modelstageappstate.AppStateVector4Value = AppStateVector4Value;
    var AppStateFloatValue = /** @class */ (function (_super) {
        __extends(AppStateFloatValue, _super);
        function AppStateFloatValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateFloatValue.prototype.readValue = /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var result = NaN;
            if (reader.Reader.assureRemainingBytes(4)) {
                result = reader.Reader.readFloat32();
            }
            return result;
        };
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateFloatValue.prototype.writeValue = /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (writer, value) {
            writer.Writer.writeFloat32(value);
        };
        return AppStateFloatValue;
    }(AppStateValue));
    modelstageappstate.AppStateFloatValue = AppStateFloatValue;
    var AppStateOperation = /** @class */ (function () {
        function AppStateOperation(changedAt, isLocal) {
            if (isLocal === void 0) { isLocal = true; }
            this.changedAt = changedAt;
            this.isLocal = isLocal;
        }
        Object.defineProperty(AppStateOperation.prototype, "ChangedAt", {
            get: /**
             * @return {?}
             */
            function () {
                return this.changedAt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateOperation.prototype, "IsLocal", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isLocal;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateOperation;
    }());
    modelstageappstate.AppStateOperation = AppStateOperation;
    /**
     * @template T
     */
    var /**
     * @template T
     */
    AppStateValueOperation = /** @class */ (function (_super) {
        __extends(AppStateValueOperation, _super);
        function AppStateValueOperation(changedAt, newValue, previousValue, isLocal) {
            if (newValue === void 0) { newValue = null; }
            if (previousValue === void 0) { previousValue = null; }
            if (isLocal === void 0) { isLocal = true; }
            var _this = _super.call(this, changedAt, isLocal) || this;
            _this.isNewValueDefined = false;
            _this.isPreviousValueDefined = false;
            if (newValue != null) {
                _this.isNewValueDefined = true;
                _this.newValue = newValue;
            }
            if (previousValue) {
                _this.isPreviousValueDefined = true;
                _this.previousValue = previousValue;
            }
            return _this;
        }
        Object.defineProperty(AppStateValueOperation.prototype, "IsNewValueDefined", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isNewValueDefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateValueOperation.prototype, "IsPreviousValueDefined", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isPreviousValueDefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateValueOperation.prototype, "NewValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateValueOperation.prototype, "PreviousValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.previousValue;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateValueOperation;
    }(AppStateOperation));
    modelstageappstate.AppStateValueOperation = AppStateValueOperation;
    var OperationType;
    (function (OperationType) {
        OperationType[OperationType["Clear"] = 0] = "Clear";
        OperationType[OperationType["Append"] = 1] = "Append";
        OperationType[OperationType["Insert"] = 2] = "Insert";
        OperationType[OperationType["Remove"] = 3] = "Remove";
        OperationType[OperationType["Replace"] = 4] = "Replace";
    })(OperationType = modelstageappstate.OperationType || (modelstageappstate.OperationType = {}));
    var StorageFlags;
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
    var /**
     * @template T
     */
    AppStateCollectionOperation = /** @class */ (function (_super) {
        __extends(AppStateCollectionOperation, _super);
        function AppStateCollectionOperation(changedAt, operation, itemIndex, newValue, previousValue, isLocal) {
            if (itemIndex === void 0) { itemIndex = 0; }
            if (newValue === void 0) { newValue = null; }
            if (previousValue === void 0) { previousValue = null; }
            if (isLocal === void 0) { isLocal = true; }
            var _this = _super.call(this, changedAt, newValue, previousValue, isLocal) || this;
            _this.operation = operation;
            _this.itemIndex = itemIndex;
            _this.reconciledItemIndex = itemIndex;
            return _this;
        }
        Object.defineProperty(AppStateCollectionOperation.prototype, "Operation", {
            get: /**
             * @return {?}
             */
            function () {
                return this.operation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateCollectionOperation.prototype, "ItemIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.itemIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateCollectionOperation.prototype, "ReconciledItemIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.reconciledItemIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.reconciledItemIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateCollectionOperation;
    }(AppStateValueOperation));
    modelstageappstate.AppStateCollectionOperation = AppStateCollectionOperation;
    /**
     * @template T
     */
    var /**
     * @template T
     */
    AppStateCollection = /** @class */ (function (_super) {
        __extends(AppStateCollection, _super);
        function AppStateCollection(appStateCollectionOperationType, serializeOperationChangedAt, serializePreviousValues) {
            if (serializeOperationChangedAt === void 0) { serializeOperationChangedAt = true; }
            if (serializePreviousValues === void 0) { serializePreviousValues = true; }
            var _this = _super.call(this) || this;
            _this.appStateCollectionOperationType = appStateCollectionOperationType;
            _this.container = [];
            _this.operations = [];
            _this.serializeOperationChangedAt = serializeOperationChangedAt;
            _this.serializePreviousValues = serializePreviousValues;
            return _this;
        }
        Object.defineProperty(AppStateCollection.prototype, "Operations", {
            get: /**
             * @return {?}
             */
            function () {
                return this.operations;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @param {?} op
         * @return {?}
         */
        AppStateCollection.prototype.addOperation = /**
         * @protected
         * @param {?} op
         * @return {?}
         */
        function (op) {
            if (this.isTransactional()) {
                if (this.operations.length == 0) {
                    this.beginChanging();
                }
                this.operations.push(op);
            }
            else {
                console.error('AppState not transactional while adding operation to AppStateCollection');
            }
        };
        /**
         * @return {?}
         */
        AppStateCollection.prototype.clear = /**
         * @return {?}
         */
        function () {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Clear));
            }
            this.container.length = 0;
        };
        /**
         * @param {?} item
         * @return {?}
         */
        AppStateCollection.prototype.append = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Append, this.container.length, item));
            }
            this.container.push(item);
        };
        /**
         * @param {?} item
         * @param {?} beforeIndex
         * @return {?}
         */
        AppStateCollection.prototype.insert = /**
         * @param {?} item
         * @param {?} beforeIndex
         * @return {?}
         */
        function (item, beforeIndex) {
            if (beforeIndex <= this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Insert, beforeIndex, item));
                }
                this.container.splice(beforeIndex, 0, item);
            }
            else {
                console.error('Index out of range while inserting into AppStateCollection');
            }
        };
        /**
         * @param {?} index
         * @return {?}
         */
        AppStateCollection.prototype.remove = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Remove, index, null, this.container[index]));
                }
                this.container.splice(index, 1);
            }
            else {
                console.error('Index out of range while removing from AppStateCollection');
            }
        };
        /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        AppStateCollection.prototype.replace = /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Replace, index, item, this.container[index]));
                }
                this.container[index] = item;
            }
            else {
                console.error('Index out of range while replacing item in AppStateCollection');
            }
        };
        /**
         * @param {?} index
         * @return {?}
         */
        AppStateCollection.prototype.GetItemAt = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            return this.container[index];
        };
        Object.defineProperty(AppStateCollection.prototype, "Count", {
            get: /**
             * @return {?}
             */
            function () {
                return this.container.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AppStateCollection.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.operations.length > 0;
        };
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateCollection.prototype.deserializeDelta = /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        function (reader, key) {
            // key was read by cluster
            /** @type {?} */
            var changedAt = reader.Reader.readTimestamp();
            /** @type {?} */
            var operationCount = reader.Reader.readUInt32();
            /** @type {?} */
            var success = !reader.Reader.Error;
            if (success) {
                if (operationCount > 0) {
                    this.setDirty();
                }
                for (var i = 0; i < operationCount; ++i) {
                    /** @type {?} */
                    var flags = reader.Reader.readByte();
                    if (!reader.Reader.Error) {
                        /** @type {?} */
                        var storageFlags = flags & StorageFlags.Mask;
                        /** @type {?} */
                        var opType = flags & ~StorageFlags.Mask;
                        /** @type {?} */
                        var opChangedAt = changedAt;
                        /** @type {?} */
                        var itemIndex = 0;
                        /** @type {?} */
                        var newValue = void 0;
                        /** @type {?} */
                        var prevValue = void 0;
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
        };
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateCollection.prototype.serializeDelta = /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        function (writer, key) {
            var _this = this;
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeInt32(this.operations.length);
            this.operations.forEach(function (op) {
                /** @type {?} */
                var storageFlags = (op.ItemIndex < 0x10000 ? StorageFlags.ItemIndex16Bit : StorageFlags.None) |
                    (op.IsNewValueDefined ? StorageFlags.HasNewValue : StorageFlags.None) |
                    (op.IsPreviousValueDefined && _this.serializePreviousValues ? StorageFlags.HasPreviousValue : StorageFlags.None) |
                    (_this.serializeOperationChangedAt ? StorageFlags.HasChangedDate : StorageFlags.None);
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
                    _this.cluster.writeValue(key, writer, op.NewValue);
                }
                if (storageFlags & StorageFlags.HasPreviousValue) {
                    _this.cluster.writeValue(key, writer, op.PreviousValue);
                }
            });
        };
        /**
         * @return {?}
         */
        AppStateCollection.prototype.reconcile = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.operations.forEach(function (operation) {
                if (!operation.IsLocal) {
                    switch (operation.Operation) {
                        case OperationType.Clear:
                            _this.container.length = 0;
                            operation.ReconciledItemIndex = -1;
                            break;
                        case OperationType.Append:
                            if (operation.IsNewValueDefined) {
                                _this.container.push(operation.NewValue);
                                operation.ReconciledItemIndex = _this.container.length - 1;
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Append reconciliation');
                            }
                            break;
                        case OperationType.Insert:
                            if (operation.IsNewValueDefined) {
                                if (operation.ItemIndex < _this.container.length) {
                                    _this.container.splice(operation.ItemIndex, 0, operation.NewValue);
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    _this.container.push(operation.NewValue);
                                    operation.ReconciledItemIndex = _this.container.length - 1;
                                }
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Insert reconciliation');
                            }
                            break;
                        case OperationType.Remove:
                            if (operation.IsPreviousValueDefined) {
                                if (operation.ItemIndex < _this.container.length) { // && operation.PreviousValue == this.container[operation.ItemIndex]) {
                                    _this.container.splice(operation.ItemIndex, 1);
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
                                if (operation.ItemIndex < _this.container.length) {
                                    _this.container[operation.ItemIndex] = operation.NewValue;
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
        };
        /**
         * @return {?}
         */
        AppStateCollection.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            _super.prototype.beginTransaction.call(this);
            this.operations.length = 0;
        };
        return AppStateCollection;
    }(CommonAppStateEntry));
    modelstageappstate.AppStateCollection = AppStateCollection;
    var AppStateClusterManagerBase = /** @class */ (function () {
        function AppStateClusterManagerBase() {
            /**
             * A vector managing pointers to all instances of the corresponding cluster type.
             */
            this.allInstances = [];
        }
        /** Adds a new instance of the corresponding cluster type to this.
          */
        /**
         * Adds a new instance of the corresponding cluster type to this.
         * @protected
         * @param {?} instance
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.addInstance = /**
         * Adds a new instance of the corresponding cluster type to this.
         * @protected
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            instance.registerEntries();
            this.allInstances.push(instance);
        };
        /** Starts the transactional phase. Changes to entries and their values may only be carried out
          * during the transactional phase.
          */
        /**
         * Starts the transactional phase. Changes to entries and their values may only be carried out
         * during the transactional phase.
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.beginTransaction = /**
         * Starts the transactional phase. Changes to entries and their values may only be carried out
         * during the transactional phase.
         * @return {?}
         */
        function () {
            for (var clusterKey in this.allInstances) {
                this.allInstances[clusterKey].beginTransaction();
            }
        };
        /** Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        /**
         * Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.endTransaction = /**
         * Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        function () {
            for (var clusterKey in this.allInstances) {
                this.allInstances[clusterKey].endTransaction();
            }
        };
        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state.
          */
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state.
         * @param {?} scene
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.applyChanges = /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state.
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
            for (var clusterKey in this.allInstances) {
                /** @type {?} */
                var cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    cluster.applyChanges(scene, cluster.PeerID, cluster.InstanceID);
                    scene.setDirty();
                }
            }
        };
        /** Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        /**
         * Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.serializeClusterInstanceData = /**
         * Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (cluster, deltaWriter, appState) {
        };
        /** Serializes all changes that have been carried out on clusters of the corresponding type.
          */
        /**
         * Serializes all changes that have been carried out on clusters of the corresponding type.
         * @param {?} deltaWriter
         * @param {?} clusterID
         * @param {?} appState
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.serializeTransaction = /**
         * Serializes all changes that have been carried out on clusters of the corresponding type.
         * @param {?} deltaWriter
         * @param {?} clusterID
         * @param {?} appState
         * @return {?}
         */
        function (deltaWriter, clusterID, appState) {
            var _this = this;
            /** @type {?} */
            var dirtyClusters = [];
            for (var clusterKey in this.allInstances) {
                /** @type {?} */
                var cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    dirtyClusters.push(cluster);
                }
            }
            if (dirtyClusters.length > 0) {
                deltaWriter.Writer.writeString(clusterID);
                deltaWriter.Writer.writeUInt16(dirtyClusters.length);
                dirtyClusters.forEach(function (cluster) {
                    _this.serializeClusterInstanceData(cluster, deltaWriter, appState);
                    cluster.serializeTransaction(deltaWriter, appState);
                });
            }
        };
        /** Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        /**
         * Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.deserializeTransaction = /**
         * Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            return false;
        };
        return AppStateClusterManagerBase;
    }());
    modelstageappstate.AppStateClusterManagerBase = AppStateClusterManagerBase;
    /**
     * Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
     * @template TAppStateCluster
     */
    var /**
     * Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
     * @template TAppStateCluster
     */
    GlobalAppStateClusterManager = /** @class */ (function (_super) {
        __extends(GlobalAppStateClusterManager, _super);
        function GlobalAppStateClusterManager(clusterTypeID, clusterType) {
            var _this = _super.call(this) || this;
            _this.clusterType = clusterType;
            _this.onlyInstance = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, _this);
            _this.addInstance(_this.onlyInstance);
            return _this;
        }
        /** Gets the only instance of this cluster type.
          */
        /**
         * Gets the only instance of this cluster type.
         * @return {?}
         */
        GlobalAppStateClusterManager.prototype.getGlobalCluster = /**
         * Gets the only instance of this cluster type.
         * @return {?}
         */
        function () {
            return this.onlyInstance;
        };
        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
          */
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        GlobalAppStateClusterManager.prototype.serializeClusterInstanceData = /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (cluster, deltaWriter, appState) {
        };
        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
          * additional data from the reader.
          */
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
         * additional data from the reader.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        GlobalAppStateClusterManager.prototype.deserializeTransaction = /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
         * additional data from the reader.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            /** @type {?} */
            var success = false;
            /** @type {?} */
            var instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (var i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    var cluster = this.getGlobalCluster();
                    success = cluster.deserializeTransaction(deltaReader, appState, scene);
                }
            }
            return success;
        };
        return GlobalAppStateClusterManager;
    }(AppStateClusterManagerBase));
    modelstageappstate.GlobalAppStateClusterManager = GlobalAppStateClusterManager;
    /**
     * Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the
     * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
     * @template TAppStateCluster
     */
    var /**
     * Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the
     * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
     * @template TAppStateCluster
     */
    LocalAppStateClusterManager = /** @class */ (function (_super) {
        __extends(LocalAppStateClusterManager, _super);
        function LocalAppStateClusterManager(clusterTypeID, clusterType) {
            var _this = _super.call(this) || this;
            _this.clusterType = clusterType;
            /**
             * The map of cluster per peer.
             */
            _this.peerClusters = {};
            _this.peerClusters[''] = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, _this);
            _this.addInstance(_this.peerClusters['']);
            return _this;
        }
        /** Gets the local peer's instance of this cluster type.
          */
        /**
         * Gets the local peer's instance of this cluster type.
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.getLocalCluster = /**
         * Gets the local peer's instance of this cluster type.
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.allInstances['']));
        };
        /** \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
          * it's created.
          */
        /**
         * \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
         * it's created.
         * @param {?} peerID
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.getCluster = /**
         * \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
         * it's created.
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            /** @type {?} */
            var result = null;
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
        };
        /** Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
          */
        /**
         * Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
         * @param {?} peerID
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.containsCluster = /**
         * Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            return this.peerClusters[peerID] != null;
        };
        /** As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
          * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
          */
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
         * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.serializeClusterInstanceData = /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
         * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (cluster, deltaWriter, appState) {
            /** @type {?} */
            var peerID = cluster.PeerID;
            // Use local peerID if the cluster's peer ID is empty.
            deltaWriter.Writer.writeString(peerID.length == 0 ? appState.LocalPeerID : peerID);
        };
        /** As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
          * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
          * key (empty string) that is used to identify local peer data.
          */
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
         * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
         * key (empty string) that is used to identify local peer data.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.deserializeTransaction = /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
         * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
         * key (empty string) that is used to identify local peer data.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            /** @type {?} */
            var success = false;
            /** @type {?} */
            var instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (var i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    var peerID = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        if (peerID == appState.LocalPeerID) {
                            peerID = '';
                        }
                        /** @type {?} */
                        var cluster = this.getCluster(peerID);
                        success = cluster.deserializeTransaction(deltaReader, appState, scene);
                    }
                }
            }
            return success;
        };
        return LocalAppStateClusterManager;
    }(AppStateClusterManagerBase));
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
    var /**
     * AppStateCluster instances store information about the application state. Based on application state, changes
     * to the view state are carried out. In order to be able to synchronize application state, operations on the entries that
     * are aggregated by AppStateCluster,  are stored during a "transactional phase". Immediately afterwards, all changes are
     * collected and sync'ed with remote peers. Similarly, when remote changes are received, they are processed after the local
     * collection took place, causing app state changes. Finally, all cluster's entry's changes are processed to update the
     * application's view state.
     * @abstract
     */
    AppStateCluster = /** @class */ (function () {
        /** Constructor
          * @param peerID		The peer ID this cluster instance belongs to. If it's left empty, the local peer's ID will be used.
          * @param instanceID	The peer-unique instance ID. This ID is only necessary, if multi-instances are used (per peer). This depends on the AppStateClusterManager used to manage instances.
          * @param appState		The app state container this cluster belongs to.
          */
        function AppStateCluster(peerID, instanceID, appState) {
            this.entries = {};
            this.dirty = false;
            this.lockCount = 0;
            this.peerID = peerID || '';
            this.instanceID = instanceID || '';
            this.appState = appState || AppState.GetInstance();
        }
        Object.defineProperty(AppStateCluster.prototype, "PeerID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.peerID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.peerID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateCluster.prototype, "InstanceID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.instanceID;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AppStateCluster.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            this.dirty = false;
            for (var entryIdx in this.entries) {
                this.entries[entryIdx].beginTransaction();
            }
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.endTransaction = /**
         * @return {?}
         */
        function () {
            for (var entryIdx in this.entries) {
                this.entries[entryIdx].endTransaction();
            }
        };
        /**
         * @private
         * @param {?} scene
         * @return {?}
         */
        AppStateCluster.prototype.reconcile = /**
         * @private
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
            for (var entryIdx in this.entries) {
                this.entries[entryIdx].reconcile();
            }
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.setDirty = /**
         * @return {?}
         */
        function () {
            this.dirty = true;
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.dirty;
        };
        /**
         * @param {?} key
         * @param {?} entry
         * @return {?}
         */
        AppStateCluster.prototype.registerEntry = /**
         * @param {?} key
         * @param {?} entry
         * @return {?}
         */
        function (key, entry) {
            this.entries[key] = entry;
            entry.register(key, this);
        };
        /** ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
          * override ApplyChanges to update the view state based on the app state changes that occured.
          */
        /**
         * ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
         * override ApplyChanges to update the view state based on the app state changes that occured.
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        AppStateCluster.prototype.applyChanges = /**
         * ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
         * override ApplyChanges to update the view state based on the app state changes that occured.
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
        };
        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        AppStateCluster.prototype.serializeTransaction = /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (deltaWriter, appState) {
            // setIsInitializing(deltaWriter.IsInitialization());
            // setIsInitializing(deltaWriter.IsInitialization());
            /** @type {?} */
            var dirtyEntries = [];
            for (var idx in this.entries) {
                if (this.entries[idx].isDirty()) {
                    dirtyEntries.push({ key: idx, entry: this.entries[idx] });
                }
            }
            deltaWriter.Writer.writeUInt16(dirtyEntries.length);
            dirtyEntries.forEach(function (e) {
                e.entry.serializeDelta(deltaWriter, e.key);
            });
        };
        /** Retrieves all remote operations that have been received from remote peers.
          */
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        AppStateCluster.prototype.deserializeTransaction = /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            /** @type {?} */
            var success = true;
            /** @type {?} */
            var entryCount = deltaReader.Reader.readUInt16();
            // setIsInitializing(deltaReader.IsInitializing());
            if (!deltaReader.Reader.Error) {
                for (var i = 0; i < entryCount && success; ++i) {
                    /** @type {?} */
                    var entryKey = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        /** @type {?} */
                        var entry = this.entries[entryKey];
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
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.lock = /**
         * @return {?}
         */
        function () {
            ++this.lockCount;
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.unlock = /**
         * @return {?}
         */
        function () {
            --this.lockCount;
        };
        Object.defineProperty(AppStateCluster.prototype, "IsLocked", {
            get: /**
             * @return {?}
             */
            function () {
                return this.lockCount > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        AppStateCluster.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            console.error('readValue not implemented for ' + key);
        };
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateCluster.prototype.writeValue = /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (key, writer, value) {
            console.error('writeValue not implemented for ' + key);
        };
        return AppStateCluster;
    }());
    modelstageappstate.AppStateCluster = AppStateCluster;
    var Director = /** @class */ (function () {
        function Director(appState) {
            this.pendingUpdates = [];
            this.pendingMessages = [];
            this.appState = appState;
        }
        Object.defineProperty(Director.prototype, "Scene", {
            set: /**
             * @param {?} scene
             * @return {?}
             */
            function (scene) {
                this.scene = scene;
            },
            enumerable: true,
            configurable: true
        });
        /** Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
          * BeginUpdate is called at the very beginning of each render cycle.
          */
        /**
         * Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
         * BeginUpdate is called at the very beginning of each render cycle.
         * @return {?}
         */
        Director.prototype.beginFrame = /**
         * Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
         * BeginUpdate is called at the very beginning of each render cycle.
         * @return {?}
         */
        function () {
            this.appState.beginTransaction();
        };
        /**
         * @return {?}
         */
        Director.prototype.commit = /**
         * @return {?}
         */
        function () {
            this.acquirePendingUpdates().forEach(function (updFunc) {
                updFunc();
            });
            this.appState.endTransaction();
        };
        /** Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
          * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
          */
        /**
         * Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
         * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
         * @param {?} connection
         * @return {?}
         */
        Director.prototype.submitLocalUpdates = /**
         * Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
         * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var AppStateDelta = 0x0100;
            /** @type {?} */
            var writer = new AppStateDeltaWriter(new BinaryWriter());
            writer.Writer.writeInt32(1);
            writer.Writer.writeInt32(AppStateDelta);
            this.appState.serializeTransaction(writer);
            /** @type {?} */
            var buf = writer.Writer.flush();
            /** @type {?} */
            var msg = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
            if (msg.HasPayload && connection.IsConnected) {
                connection.send(msg.Content);
            }
        };
        /** Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
          * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
          */
        /**
         * Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
         * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
         * @return {?}
         */
        Director.prototype.applyRemoteUpdates = /**
         * Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
         * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var pendingMessages = this.acquirePendingMessages();
            pendingMessages.forEach(function (msg) {
                _this.appState.deserializeTransaction(new AppStateDeltaReader(new BinaryReader(msg.Content)), _this.scene);
            });
        };
        /**
         * @private
         * @return {?}
         */
        Director.prototype.acquirePendingUpdates = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = this.pendingUpdates;
            this.pendingUpdates = [];
            return result;
        };
        /**
         * @private
         * @return {?}
         */
        Director.prototype.acquirePendingMessages = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = this.pendingMessages;
            this.pendingMessages = [];
            return result;
        };
        /** Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
          */
        /**
         * Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
         * @return {?}
         */
        Director.prototype.endFrame = /**
         * Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
         * @return {?}
         */
        function () {
            this.appState.applyChanges(this.scene);
        };
        /**
         * @param {?} message
         * @return {?}
         */
        Director.prototype.receivedMessage = /**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            this.pendingMessages.push(message);
        };
        /**
         * @param {?} func
         * @return {?}
         */
        Director.prototype.synchronizeStateUpdate = /**
         * @param {?} func
         * @return {?}
         */
        function (func) {
            this.pendingUpdates.push(func);
        };
        return Director;
    }());
    modelstageappstate.Director = Director;
    var DirectedSceneWebGL = /** @class */ (function (_super) {
        __extends(DirectedSceneWebGL, _super);
        function DirectedSceneWebGL(director, connection) {
            var _this = _super.call(this) || this;
            _this.director = director;
            _this.connection = connection;
            return _this;
        }
        /**
         * @return {?}
         */
        DirectedSceneWebGL.prototype.beginFrame = /**
         * @return {?}
         */
        function () {
            this.director.beginFrame();
        };
        /**
         * @return {?}
         */
        DirectedSceneWebGL.prototype.update = /**
         * @return {?}
         */
        function () {
            this.director.commit();
            if (this.connection && this.connection.IsConnected) {
                this.director.submitLocalUpdates(this.connection);
                this.director.applyRemoteUpdates();
            }
        };
        /**
         * @return {?}
         */
        DirectedSceneWebGL.prototype.endFrame = /**
         * @return {?}
         */
        function () {
            this.director.endFrame();
        };
        /**
         * @param {?} message
         * @return {?}
         */
        DirectedSceneWebGL.prototype.receivedMessage = /**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            if (message.MessageType == modelstageweb.CommonMessageTypes.AppStateDelta || message.MessageType == modelstageweb.CommonMessageTypes.AppStateInitialization) {
                this.director.receivedMessage(message);
            }
        };
        /**
         * @param {?} func
         * @return {?}
         */
        DirectedSceneWebGL.prototype.synchronizeStateUpdate = /**
         * @param {?} func
         * @return {?}
         */
        function (func) {
            this.director.synchronizeStateUpdate(func);
        };
        return DirectedSceneWebGL;
    }(modelstageweb.SceneWebGL));
    modelstageappstate.DirectedSceneWebGL = DirectedSceneWebGL;
})(modelstageappstate || (modelstageappstate = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var modelstage;
(function (modelstage) {
    var Timer = /** @class */ (function () {
        function Timer() {
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        Timer.prototype.animationFrame = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            return window.requestAnimationFrame(callback);
        };
        return Timer;
    }());
    var SpaceModel = /** @class */ (function () {
        function SpaceModel(scene, stage, actor) {
            this.scene = scene;
            this.stage = stage;
            this.actor = actor;
            this.vertices = [];
            this.floorLevel = 0;
        }
        Object.defineProperty(SpaceModel.prototype, "FloorLevel", {
            get: /**
             * @return {?}
             */
            function () { return this.floorLevel; },
            set: /**
             * @param {?} floorLevel
             * @return {?}
             */
            function (floorLevel) { this.floorLevel = floorLevel; },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        SpaceModel.prototype.initializeSquareRoom = /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        function (transparentMeshBuilder, texturedMeshBuilder) {
            texturedMeshBuilder.addQuad(-5.0, 0.0, -5.0, 0, 0, 5.0, 0.0, -5.0, 1, 0, 5.0, 0.0, 5.0, 1, 1, -5.0, 0.0, 5.0, 0, 1, 0.3, 0.3, 0.3, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, 5.0, 0.0, -5.0, 5.0, 2.6, -5.0, -5.0, 2.6, -5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, 5.0, -5.0, 2.6, 5.0, 5.0, 2.6, 5.0, 5.0, 0.0, 5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, -5.0, 2.6, -5.0, -5.0, 2.6, 5.0, -5.0, 0.0, 5.0, 0.15, 0.15, 0.15, .4, true);
            transparentMeshBuilder.addQuad(5.0, 0.0, -5.0, 5.0, 0.0, 5.0, 5.0, 2.6, 5.0, 5.0, 2.6, -5.0, 0.15, 0.15, 0.15, .4, true);
        };
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        SpaceModel.prototype.initializeArbitraryRoom = /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        function (transparentMeshBuilder, texturedMeshBuilder) {
            /** @type {?} */
            var toggle = false;
            /** @type {?} */
            var poly = new psgeometry.Polygon2D();
            for (var i = 0; i < this.vertices.length; i++) {
                poly.addVector(this.vertices[i]);
            }
            /** @type {?} */
            var bbox = new psgeometry.AABB2D();
            poly.addToAABB(bbox);
            /** @type {?} */
            var extents = bbox.extents();
            this.stage.updateShadowArea(bbox);
            poly = poly.triangulate();
            for (var i = 0; i < poly.Vertices.length; i += 3) {
                texturedMeshBuilder.addTri(poly.Vertices[i].x, 0, poly.Vertices[i].y, (poly.Vertices[i].x - bbox.minX) / extents.x, (poly.Vertices[i].y - bbox.minY) / extents.y, poly.Vertices[i + 1].x, 0, poly.Vertices[i + 1].y, (poly.Vertices[i + 1].x - bbox.minX) / extents.x, (poly.Vertices[i + 1].y - bbox.minY) / extents.y, poly.Vertices[i + 2].x, 0, poly.Vertices[i + 2].y, (poly.Vertices[i + 2].x - bbox.minX) / extents.x, (poly.Vertices[i + 2].y - bbox.minY) / extents.y, 0.2, 0.2, 0.2, true);
            }
            for (var i = 0; i < this.vertices.length; i++) {
                /** @type {?} */
                var start = this.vertices[i];
                /** @type {?} */
                var end = this.vertices[(i + 1) % this.vertices.length];
                transparentMeshBuilder.addQuad(start.x, 0.0, start.y, end.x, 0.0, end.y, end.x, 2.6, end.y, start.x, 2.6, start.y, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, .4, true);
                toggle = !toggle;
            }
        };
        /**
         * @return {?}
         */
        SpaceModel.prototype.updateSpace = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var spaceIndices = new modelstageweb.BufferAssetWebGL(undefined, 'space_indices', true);
            /** @type {?} */
            var spaceVertices = new modelstageweb.BufferAssetWebGL(undefined, 'space_vertices', false);
            /** @type {?} */
            var transparentMeshBuilder = new modelstageweb.TransparentMeshBuilder(spaceVertices, spaceIndices);
            /** @type {?} */
            var floorIndices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_indices', true);
            /** @type {?} */
            var floorVertices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_vertices', false);
            /** @type {?} */
            var texturedMeshBuilder = new modelstageweb.TexturedMeshBuilder(floorVertices, floorIndices);
            if (this.vertices.length < 3) {
                this.initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            else {
                this.initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            /** @type {?} */
            var figure = new modelstageweb.FigureWebGL('Space');
            texturedMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('floor_indices', floorIndices);
            this.stage.AssetStore.addBufferAsset('floor_vertices', floorVertices);
            /** @type {?} */
            var floorShaderInstance = new modelstageweb.MeshShaderInstance('TexturedMeshShader');
            floorShaderInstance.addReference('IndexBuffer', 'floor_indices');
            floorShaderInstance.addReference('VertexBuffer', 'floor_vertices');
            floorShaderInstance.addReference('TextureBuffer', 'Shadow');
            figure.addShaderInstance(floorShaderInstance);
            transparentMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('space_indices', spaceIndices);
            this.stage.AssetStore.addBufferAsset('space_vertices', spaceVertices);
            /** @type {?} */
            var shaderInstance = new modelstageweb.MeshShaderInstance('TransparentMeshShader');
            shaderInstance.addReference('IndexBuffer', 'space_indices');
            shaderInstance.addReference('VertexBuffer', 'space_vertices');
            figure.addShaderInstance(shaderInstance);
            this.actor.Figures[0] = figure;
            this.actor.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
            this.actor.Scene.setDirty();
        };
        /**
         * @return {?}
         */
        SpaceModel.prototype.clearVertices = /**
         * @return {?}
         */
        function () {
            this.vertices.length = 0;
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpaceModel.prototype.addVertex = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            this.vertices.push(new psgeometry.Vec2(x, y));
        };
        return SpaceModel;
    }());
    modelstage.SpaceModel = SpaceModel;
    var TheaterWebGL = /** @class */ (function () {
        function TheaterWebGL(canvasElementID) {
            var _this = this;
            this.stage = new modelstageweb.StageWebGL(canvasElementID);
            this.stage.initialize();
            //this.scene = new modelstageweb.SceneWebGL();
            this.timer = new Timer();
            this.timer.animationFrame(function () { _this.processFrame(); });
            document.addEventListener('visibilitychange', function () { _this.onVisibilityChange(); }, false);
            this.initialize();
        }
        Object.defineProperty(TheaterWebGL.prototype, "Stage", {
            get: /**
             * @return {?}
             */
            function () {
                return this.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TheaterWebGL.prototype, "Scene", {
            get: /**
             * @return {?}
             */
            function () {
                return this.scene;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @return {?}
         */
        TheaterWebGL.prototype.initialize = /**
         * @protected
         * @return {?}
         */
        function () {
        };
        /** Main render cycle for a frame.
          */
        /**
         * Main render cycle for a frame.
         * @protected
         * @return {?}
         */
        TheaterWebGL.prototype.processFrame = /**
         * Main render cycle for a frame.
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
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
            this.timer.animationFrame(function () { _this.processFrame(); });
        };
        /**
         * @protected
         * @return {?}
         */
        TheaterWebGL.prototype.render = /**
         * @protected
         * @return {?}
         */
        function () {
            if (this.scene.IsInitialized) {
                this.stage.render(this.scene);
            }
        };
        /**
         * @private
         * @return {?}
         */
        TheaterWebGL.prototype.onVisibilityChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!document.hidden) {
                this.timer.animationFrame(function () { _this.render(); });
            }
        };
        return TheaterWebGL;
    }());
    modelstage.TheaterWebGL = TheaterWebGL;
    var ActorManipulationTool = /** @class */ (function (_super) {
        __extends(ActorManipulationTool, _super);
        function ActorManipulationTool(connection) {
            var _this = _super.call(this) || this;
            _this.connection = connection;
            return _this;
        }
        /**
         * @protected
         * @param {?} objID
         * @return {?}
         */
        ActorManipulationTool.prototype.getSceneObj = /**
         * @protected
         * @param {?} objID
         * @return {?}
         */
        function (objID) {
            /** @type {?} */
            var sceneObjIdx = 0;
            /** @type {?} */
            var sceneObj = null;
            while (sceneObjIdx < SceneAppState.GlobalInstance.SceneObjects.Count && !sceneObj) {
                if (SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx).SceneObjectID == objID) {
                    sceneObj = SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx);
                }
                else {
                    ++sceneObjIdx;
                }
            }
            return [sceneObj, sceneObjIdx];
        };
        /**
         * @private
         * @param {?} actor
         * @return {?}
         */
        ActorManipulationTool.prototype.updateModelTransform = /**
         * @private
         * @param {?} actor
         * @return {?}
         */
        function (actor) {
            /** @type {?} */
            var translationVec = actor.Data['translate'] || psgeometry.Vec4.Zero;
            /** @type {?} */
            var rotationVec = actor.Data['rotate'] || psgeometry.Vec4.Zero;
            this.connection.send('Scene|Transform|' + actor.SceneItemID + '|' + translationVec.x + ',' + translationVec.y + ',' + translationVec.z + '|' + rotationVec.y + ',' + rotationVec.x + ',' + rotationVec.z);
            /** @type {?} */
            var translation = psgeometry.Matrix4.FromTranslation(translationVec.x, translationVec.y, translationVec.z);
            /** @type {?} */
            var rotation = psgeometry.Matrix4.FromRotationY(rotationVec.y);
            actor.State.set('ModelTransform', (/** @type {?} */ (rotation.multiply(translation))));
            actor.Scene.setDirty();
        };
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        ActorManipulationTool.prototype.updateActorTranslation = /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (actor, x, y, z) {
            actor.Data['translate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        };
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        ActorManipulationTool.prototype.updateActorRotation = /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (actor, x, y, z) {
            actor.Data['rotate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        };
        return ActorManipulationTool;
    }(modelstageweb.Tool));
    modelstage.ActorManipulationTool = ActorManipulationTool;
    var SelectionTool = /** @class */ (function (_super) {
        __extends(SelectionTool, _super);
        function SelectionTool(scene, stage, connection) {
            var _this = _super.call(this, connection) || this;
            _this.scene = scene;
            _this.stage = stage;
            return _this;
        }
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        SelectionTool.prototype.enter = /**
         * @param {?} interfaceController
         * @return {?}
         */
        function (interfaceController) {
            _super.prototype.enter.call(this, interfaceController);
            this.updateSelectionMarker();
        };
        /**
         * @return {?}
         */
        SelectionTool.prototype.leave = /**
         * @return {?}
         */
        function () {
            this.removeSelectionMarker();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionTool.prototype.handleKeyUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.keyCode == 46 && this.selectedActor) { // delete key
                // delete key
                var _a = __read(this.getSceneObj(this.selectedActor.Data['SceneObjID']), 2), sceneObj = _a[0], sceneObjIdx = _a[1];
                if (sceneObj) {
                    SceneAppState.GlobalInstance.SceneObjects.remove(sceneObjIdx);
                    this.removeSelectionMarker();
                    this.selectedActor = null;
                    return true;
                }
            }
            return false;
        };
        /**
         * @private
         * @return {?}
         */
        SelectionTool.prototype.removeSelectionMarker = /**
         * @private
         * @return {?}
         */
        function () {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
        };
        /**
         * @private
         * @return {?}
         */
        SelectionTool.prototype.updateSelectionMarker = /**
         * @private
         * @return {?}
         */
        function () {
            var _a;
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
            if (this.selectedActor) {
                /** @type {?} */
                var box_1 = new psgeometry.AABB3D;
                this.selectedActor.Figures.forEach(function (fig) {
                    box_1.addAABB(fig.getBoundingBox());
                });
                /** @type {?} */
                var bottomCenterPoint = new psgeometry.Vec3(box_1.center().x, box_1.minY, box_1.center().z);
                /** @type {?} */
                var selectionMarker = new modelstageweb.ActorWebGL(this.scene, SelectionTool.SelectionObjectID);
                var _b = __read([.16, .34, .6], 3), r = _b[0], g = _b[1], b = _b[2];
                /** @type {?} */
                var meshBuilder = new modelstageweb.OpaqueMeshBuilder();
                // top lid
                meshBuilder.addStroke(box_1.minX, box_1.maxY, box_1.minZ, box_1.maxX, box_1.maxY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.maxY, box_1.minZ, box_1.maxX, box_1.maxY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.maxY, box_1.maxZ, box_1.minX, box_1.maxY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.minX, box_1.maxY, box_1.maxZ, box_1.minX, box_1.maxY, box_1.minZ, r, g, b);
                // bottom lid
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.minZ, box_1.maxX, box_1.minY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.minZ, box_1.maxX, box_1.minY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.maxZ, box_1.minX, box_1.minY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.maxZ, box_1.minX, box_1.minY, box_1.minZ, r, g, b);
                // vertical lines
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.minZ, box_1.minX, box_1.maxY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.maxZ, box_1.minX, box_1.maxY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.minZ, box_1.maxX, box_1.maxY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.maxZ, box_1.maxX, box_1.maxY, box_1.maxZ, r, g, b);
                selectionMarker.addFigure(meshBuilder.createFigure(this.stage, 'SEL_MARKER'));
                /** @type {?} */
                var figureBoundingBox = new psgeometry.AABB3D();
                _a = __read([.6, .1, .1], 3), r = _a[0], g = _a[1], b = _a[2];
                /** @type {?} */
                var meshBuilder1 = new modelstageweb.OpaqueMeshBuilder();
                /** @type {?} */
                var segmentCount = 24;
                /** @type {?} */
                var radius0 = 1;
                /** @type {?} */
                var radius1 = 1.1;
                for (var i = 0; i < segmentCount; ++i) {
                    /** @type {?} */
                    var angle0 = 2 * Math.PI / segmentCount * i;
                    /** @type {?} */
                    var angle1 = 2 * Math.PI / segmentCount * (i + 1);
                    /** @type {?} */
                    var inner0 = new psgeometry.Vec3(Math.sin(angle0) * radius0, 0, Math.cos(angle0) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    var inner1 = new psgeometry.Vec3(Math.sin(angle1) * radius0, 0, Math.cos(angle1) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    var outer0 = new psgeometry.Vec3(Math.sin(angle0) * radius1, 0, Math.cos(angle0) * radius1).add(bottomCenterPoint);
                    /** @type {?} */
                    var outer1 = new psgeometry.Vec3(Math.sin(angle1) * radius1, 0, Math.cos(angle1) * radius1).add(bottomCenterPoint);
                    meshBuilder1.addQuad(outer0.x, outer0.y + 0.02, outer0.z, outer1.x, outer1.y + 0.02, outer1.z, inner1.x, inner1.y + 0.02, inner1.z, inner0.x, inner0.y + 0.02, inner0.z, r, g, b);
                    meshBuilder1.addQuad(outer0.x, outer1.y - 0.02, outer0.z, outer1.x, outer1.y - 0.02, outer1.z, outer1.x, outer1.y + 0.02, outer1.z, outer0.x, outer0.y + 0.02, outer0.z, r, g, b);
                    meshBuilder1.addQuad(inner0.x, inner0.y - 0.02, inner0.z, inner1.x, inner1.y - 0.02, inner1.z, outer1.x, outer1.y - 0.02, outer1.z, outer0.x, outer0.y - 0.02, outer0.z, r, g, b);
                    figureBoundingBox.addVector(outer0);
                }
                /** @type {?} */
                var figure = meshBuilder1.createFigure(this.stage, 'ROT_MARKER');
                figure.setIntersector(new modelstageweb.BoundingBoxIntersector(figureBoundingBox));
                selectionMarker.addFigure(figure);
                /** @type {?} */
                var sceneObjTranslation = this.scene.State.get('SceneObjectPos' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                /** @type {?} */
                var sceneObjRotation = this.scene.State.get('SceneObjectRot' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                selectionMarker.State.set('ModelTransform', psgeometry.Matrix4.FromRotation(sceneObjRotation.x, sceneObjRotation.y, sceneObjRotation.z).multiply(psgeometry.Matrix4.FromTranslation(sceneObjTranslation.x, sceneObjTranslation.y, sceneObjTranslation.z)));
                selectionMarker.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
                this.scene.addSceneItem(selectionMarker, true);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionTool.prototype.handleMouseDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var viewRay = this.stage.Camera.getViewRay(e.clientX, e.clientY);
            /** @type {?} */
            var candidates = [];
            this.scene.getIntersectionCandidates(viewRay, candidates);
            /** @type {?} */
            var pickedObject = false;
            /** @type {?} */
            var currentIdx = 0;
            while (!pickedObject && currentIdx < candidates.length) {
                if (candidates[currentIdx].sceneItem instanceof modelstageweb.ActorWebGL) {
                    /** @type {?} */
                    var pickedActor = (/** @type {?} */ ((candidates[currentIdx].sceneItem)));
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
        };
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SelectionTool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
        };
        SelectionTool.SelectionObjectID = 'SEL_MARKER';
        return SelectionTool;
    }(ActorManipulationTool));
    modelstage.SelectionTool = SelectionTool;
    var PlaceActorTool = /** @class */ (function (_super) {
        __extends(PlaceActorTool, _super);
        function PlaceActorTool(figureID, camera, connection) {
            var _this = _super.call(this, connection) || this;
            _this.camera = camera;
            _this.sceneObj = new SceneObject();
            _this.sceneObj.AssetID = figureID;
            _this.sceneObj.SceneObjectID = modelstageweb.uuidv4();
            _this.sceneObj.Location = new psgeometry.Vec4();
            _this.sceneObj.Rotation = new psgeometry.Vec4();
            _this.sceneObj.Scale = new psgeometry.Vec4(1, 1, 1, 1);
            SceneAppState.GlobalInstance.SceneObjects.append(_this.sceneObj);
            _this.sceneObjIdx = SceneAppState.GlobalInstance.SceneObjects.Count - 1;
            return _this;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        PlaceActorTool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
            /** @type {?} */
            var viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            var p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                this.sceneObj = __assign({}, this.sceneObj);
                this.sceneObj.Location = new psgeometry.Vec4(p.x, 0, p.z);
                SceneAppState.GlobalInstance.SceneObjects.replace(this.sceneObj, this.sceneObjIdx);
                //this.updateActorTranslation(this.actor, p.x, 0, p.z);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        PlaceActorTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.interfaceController.popTool();
        };
        return PlaceActorTool;
    }(ActorManipulationTool));
    modelstage.PlaceActorTool = PlaceActorTool;
    /** @type {?} */
    var UserNames = {
        'Administrator': 'Administrator',
        'Arne': 'Arne Thurm',
        'Ulrich': 'Ulrich Bönkemeyer',
        'Tom': 'Tom Jachmann',
        'Zacharias': 'Zacharias Reinhardt'
    };
    /** @type {?} */
    var PeerColors = [
        [0.31, 0.02, 0.06, 1.00],
        [0.02, 0.17, 0.31, 1.00],
        [0.02, 0.31, 0.06, 1.00],
        [0.69, 0.34, 0.00, 1.00],
        [0.33, 0.00, 0.53, 1.00],
    ];
    var MoveActorTool = /** @class */ (function (_super) {
        __extends(MoveActorTool, _super);
        function MoveActorTool(actor, camera, connection) {
            var _this = _super.call(this, connection) || this;
            _this.actor = actor;
            _this.camera = camera;
            _this.isInitialized = false;
            return _this;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        MoveActorTool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
            /** @type {?} */
            var viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            var p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                if (this.isInitialized) {
                    var _a = __read(this.getSceneObj(this.actor.Data['SceneObjID']), 2), sceneObj = _a[0], sceneObjIdx = _a[1];
                    if (sceneObj) {
                        /** @type {?} */
                        var translatedSceneObj = __assign({}, sceneObj);
                        /** @type {?} */
                        var translation = translatedSceneObj.Location;
                        translatedSceneObj.Location = translatedSceneObj.Location.add(new psgeometry.Vec4(p.x - this.lastX, 0, p.z - this.lastZ));
                        SceneAppState.GlobalInstance.SceneObjects.replace(translatedSceneObj, sceneObjIdx);
                    }
                }
                this.lastX = p.x;
                this.lastZ = p.z;
                this.isInitialized = true;
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        MoveActorTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.interfaceController.popTool();
        };
        return MoveActorTool;
    }(ActorManipulationTool));
    modelstage.MoveActorTool = MoveActorTool;
    var RotateActorTool = /** @class */ (function (_super) {
        __extends(RotateActorTool, _super);
        function RotateActorTool(actor, camera, connection) {
            var _this = _super.call(this, connection) || this;
            _this.actor = actor;
            _this.camera = camera;
            return _this;
        }
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        RotateActorTool.prototype.handleDrag = /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, startX, startY, dX, dY) {
            /** @type {?} */
            var fac = 1;
            if (Math.abs(e.clientY - startY) > 300) {
                fac = 6;
            }
            else if (Math.abs(e.clientY - startY) > 200) {
                fac = 3;
            }
            else if (Math.abs(e.clientY - startY) > 100) {
                fac = 2;
            }
            var _a = __read(this.getSceneObj(this.actor.Data['SceneObjID']), 2), sceneObj = _a[0], sceneObjIdx = _a[1];
            if (sceneObj) {
                /** @type {?} */
                var rotatedSceneObj = __assign({}, sceneObj);
                /** @type {?} */
                var rotation = rotatedSceneObj.Rotation;
                rotatedSceneObj.Rotation = rotatedSceneObj.Rotation.add(new psgeometry.Vec4(dX / (fac * 100) * Math.PI, 0, 0));
                SceneAppState.GlobalInstance.SceneObjects.replace(rotatedSceneObj, sceneObjIdx);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        RotateActorTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.interfaceController.popTool();
        };
        return RotateActorTool;
    }(ActorManipulationTool));
    modelstage.RotateActorTool = RotateActorTool;
    var DemoSceneWebGL = /** @class */ (function (_super) {
        __extends(DemoSceneWebGL, _super);
        function DemoSceneWebGL(stage, connection) {
            var _this = _super.call(this, new modelstageappstate.Director(modelstageappstate.AppState.GetInstance()), connection) || this;
            _this.spaceActor = new modelstageweb.ActorWebGL(_this, 'Space');
            _this.director.Scene = _this;
            _this.stage = stage;
            _this.spaceModel = new SpaceModel(_this, _this.stage, _this.spaceActor);
            /** @type {?} */
            var shaderProgram = new modelstageweb.OpaqueMeshShaderProgramWebGL();
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
            return _this;
        }
        Object.defineProperty(DemoSceneWebGL.prototype, "SpaceModel", {
            get: /**
             * @return {?}
             */
            function () { return this.spaceModel; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DemoSceneWebGL.prototype.initialize = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.addSceneItem(this.spaceActor, true);
            this.spaceModel.updateSpace();
            JQuery.when(
            //                this.stage.AssetFactory.getFromUrl('/data/commonassets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/hologem.psmesh'), 
            //                this.stage.AssetFactory.getFromUrl('/data/office_assets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/office_assets_bake.psmesh')).done(function () {
                _this.IsInitialized = true;
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
        };
        /**
         * @return {?}
         */
        DemoSceneWebGL.prototype.updateSpace = /**
         * @return {?}
         */
        function () {
            this.spaceModel.clearVertices();
            for (var i = 0; i < RoomAppState.GlobalInstance.Vertices.Count; ++i) {
                /** @type {?} */
                var vert = RoomAppState.GlobalInstance.Vertices.GetItemAt(i);
                this.spaceModel.addVertex(vert.x, vert.z);
            }
            this.spaceModel.updateSpace();
        };
        /**
         * @param {?} peerID
         * @param {?} peerColorIndex
         * @param {?} userName
         * @return {?}
         */
        DemoSceneWebGL.prototype.updatePeerInfo = /**
         * @param {?} peerID
         * @param {?} peerColorIndex
         * @param {?} userName
         * @return {?}
         */
        function (peerID, peerColorIndex, userName) {
            if (peerID != '-1') {
                /** @type {?} */
                var peerInfoID = 'peer-info-' + peerID;
                /** @type {?} */
                var peerInfoElement = JQuery('#' + peerInfoID);
                if (peerInfoElement.length > 0) {
                    peerInfoElement.find('span').text(userName);
                }
                else {
                    JQuery('#participants-view').append('<li id="' + peerInfoID + '"><img src="images/info/Lens' + peerColorIndex + '.png" /><span>' + userName + '</span></li>');
                }
            }
        };
        /**
         * @param {?} peerID
         * @return {?}
         */
        DemoSceneWebGL.prototype.removePeer = /**
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            this.removeSceneItem('Peer' + peerID);
            /** @type {?} */
            var peerInfoID = 'peer-info-' + peerID;
            /** @type {?} */
            var peerInfoElement = JQuery('#' + peerInfoID);
            peerInfoElement.addClass('removing');
            setTimeout(function () {
                peerInfoElement.remove();
            }, 2000);
        };
        /**
         * @param {?} peerID
         * @return {?}
         */
        DemoSceneWebGL.prototype.getColorIndexFromPeerID = /**
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            return (parseInt(peerID) - 1) % PeerColors.length;
        };
        /**
         * @param {?} peerID
         * @return {?}
         */
        DemoSceneWebGL.prototype.createPeer = /**
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            /** @type {?} */
            var obj = new modelstageweb.ActorWebGL(this, 'Peer' + peerID);
            obj.addFigure(this.stage.AssetStore.Figures['hololens.hololens.000']);
            // TODO @UB: do this the right way...
            obj.Figures[0].ShaderInstances[0].ShaderKey = 'MatCapMeshShader';
            /** @type {?} */
            var colorIndex = this.getColorIndexFromPeerID(peerID);
            obj.State.set('Color', new psgeometry.Vec4(PeerColors[colorIndex][0], PeerColors[colorIndex][1], PeerColors[colorIndex][2], PeerColors[colorIndex][3]));
            obj.State.set('ModelTransform', function (state) {
                /** @type {?} */
                var pos = state.get('HeadPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                var cursor = state.get('CursPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                var dir = cursor.sub(pos);
                /** @type {?} */
                var spherical = psgeometry.Spherical.FromCartesianVector(dir);
                return ((/** @type {?} */ (psgeometry.Matrix4.FromRotationX(-spherical.azimuth).multiply(psgeometry.Matrix4.FromRotationY(-spherical.polar))))).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z));
            });
            this.addSceneItem(obj, true /* makeVisible */);
            obj.TestIntersection = false;
            obj.TestChildrenIntersection = false;
            return obj;
        };
        /**
         * @param {?} objectID
         * @param {?} assetID
         * @return {?}
         */
        DemoSceneWebGL.prototype.createSceneObject = /**
         * @param {?} objectID
         * @param {?} assetID
         * @return {?}
         */
        function (objectID, assetID) {
            /** @type {?} */
            var suffix = objectID;
            /** @type {?} */
            var obj = new modelstageweb.ActorWebGL(this, 'SceneObject' + suffix);
            obj.State.set('ModelTransform', function (state) {
                /** @type {?} */
                var pos = state.get('SceneObjectPos' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                var rot = state.get('SceneObjectRot' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                var scale = state.get('SceneObjectScale' + suffix, psgeometry.Vec4.One);
                return (/** @type {?} */ (psgeometry.Matrix4.FromRotation(rot.x, rot.y, rot.z).multiply(psgeometry.Matrix4.FromScaling(scale.x, scale.y, scale.z).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z)))));
            });
            obj.addFigure(this.stage.AssetStore.getFigure(assetID));
            obj.Data['SceneObjID'] = suffix;
            return obj;
        };
        return DemoSceneWebGL;
    }(modelstageappstate.DirectedSceneWebGL));
    modelstage.DemoSceneWebGL = DemoSceneWebGL;
    var RoomAppState = /** @class */ (function (_super) {
        __extends(RoomAppState, _super);
        function RoomAppState() {
            var _this = _super.call(this) || this;
            _this.FloorLevel = new modelstageappstate.AppStateFloatValue();
            _this.MasterView = new modelstageappstate.AppStateVector4Value();
            _this.Vertices = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            RoomAppState.GlobalInstance = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        RoomAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('FloorLevel', this.FloorLevel);
            this.registerEntry('MasterView', this.MasterView);
            this.registerEntry('Vertices', this.Vertices);
        };
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        RoomAppState.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            if (key == 'Vertices') {
                return reader.Reader.readVec4();
            }
            else {
                return _super.prototype.readValue.call(this, key, reader);
            }
        };
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        RoomAppState.prototype.applyChanges = /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
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
        };
        RoomAppState.ClusterTypeID = 'Room';
        return RoomAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.RoomAppState = RoomAppState;
    var SceneObject = /** @class */ (function () {
        function SceneObject() {
        }
        return SceneObject;
    }());
    var SceneAppState = /** @class */ (function (_super) {
        __extends(SceneAppState, _super);
        function SceneAppState() {
            var _this = _super.call(this) || this;
            _this.SceneObjects = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            SceneAppState.GlobalInstance = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        SceneAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('Obj', this.SceneObjects);
        };
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        SceneAppState.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            if (key == 'Obj') {
                /** @type {?} */
                var value = new SceneObject();
                value.SceneObjectID = reader.Reader.readCharArray(40);
                value.AssetID = reader.Reader.readCharArray(40);
                value.Location = reader.Reader.readVec4();
                value.Rotation = reader.Reader.readVec4();
                value.Scale = reader.Reader.readVec4();
                return value;
            }
            else {
                return _super.prototype.readValue.call(this, key, reader);
            }
        };
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        SceneAppState.prototype.writeValue = /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (key, writer, value) {
            if (key == 'Obj') {
                writer.Writer.writeCharArray(value.SceneObjectID, 40);
                writer.Writer.writeCharArray(value.AssetID, 40);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeVec4(value.Rotation);
                writer.Writer.writeVec4(psgeometry.Vec4.One);
            }
            else {
                _super.prototype.writeValue.call(this, key, writer, value);
            }
        };
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        SceneAppState.prototype.applyChanges = /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
            if (this.SceneObjects.isDirty()) {
                /** @type {?} */
                var sc_1 = (/** @type {?} */ ((scene)));
                this.SceneObjects.Operations.forEach(function (operation) {
                    if (operation.Operation == modelstageappstate.OperationType.Append) {
                        /** @type {?} */
                        var objID = operation.NewValue.SceneObjectID;
                        /** @type {?} */
                        var assetID = operation.NewValue.AssetID;
                        sc_1.addSceneItem(sc_1.createSceneObject(objID, assetID), true /* makeVisible */);
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                        //scene.RunSequence("ShowSceneObject", std::string{ "ShowSceneObject" } +noteID, { { "SceneObjectID", objID } });
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Replace) {
                        /** @type {?} */
                        var objID = operation.NewValue.SceneObjectID;
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Remove) {
                        /** @type {?} */
                        var objID = operation.PreviousValue.SceneObjectID;
                        scene.removeSceneItem('SceneObject' + objID);
                    }
                });
            }
        };
        SceneAppState.ClusterTypeID = 'Obj';
        return SceneAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.SceneAppState = SceneAppState;
    var PeerAppState = /** @class */ (function (_super) {
        __extends(PeerAppState, _super);
        function PeerAppState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.headPos = new modelstageappstate.AppStateVector4Value();
            _this.cursorPos = new modelstageappstate.AppStateVector4Value();
            _this.userID = new modelstageappstate.AppStateStringValue();
            _this.active = new modelstageappstate.AppStateBoolValue();
            return _this;
        }
        /**
         * @return {?}
         */
        PeerAppState.prototype.providesInitializationData = /**
         * @return {?}
         */
        function () {
            return true;
        };
        /**
         * @return {?}
         */
        PeerAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('Head', this.headPos);
            this.registerEntry('Curs', this.cursorPos);
            this.registerEntry('User', this.userID);
            this.registerEntry('Active', this.active);
        };
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        PeerAppState.prototype.applyChanges = /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
            /** @type {?} */
            var sc = (/** @type {?} */ (scene));
            if (peerID.length > 0 && (this.headPos.isDirty() || this.cursorPos.isDirty())) {
                if (!sc.getSceneItem('Peer' + peerID)) {
                    sc.createPeer(peerID);
                }
                /** @type {?} */
                var levelOfs = new psgeometry.Vec4(0, -sc.SpaceModel.FloorLevel, 0, 0);
                /** @type {?} */
                var headPos = this.headPos.get();
                /** @type {?} */
                var cursorPos = this.cursorPos.get();
                if (headPos && cursorPos) {
                    scene.State.set('HeadPos' + peerID, headPos.add(levelOfs));
                    scene.State.set('CursPos' + peerID, cursorPos.add(levelOfs));
                }
            }
            if (this.userID.isDirty()) {
                /** @type {?} */
                var userName = UserNames[this.userID.get()] || '';
                sc.updatePeerInfo(peerID, sc.getColorIndexFromPeerID(peerID), userName);
            }
            if (this.active.isDirty()) {
                if (!this.active.get()) {
                    sc.removePeer(peerID);
                }
            }
        };
        PeerAppState.ClusterTypeID = 'Peer';
        return PeerAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.PeerAppState = PeerAppState;
    var Note = /** @class */ (function () {
        function Note() {
        }
        return Note;
    }());
    var NotesAppState = /** @class */ (function (_super) {
        __extends(NotesAppState, _super);
        function NotesAppState() {
            var _this = _super.call(this) || this;
            _this.Notes = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            NotesAppState.GlobalInstance = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        NotesAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('Notes', this.Notes);
        };
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        NotesAppState.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            if (key == 'Notes') {
                /** @type {?} */
                var value = new Note();
                value.NoteID = reader.Reader.readCharArray(20);
                value.NoteType = reader.Reader.readUInt32();
                value.OwnerID = reader.Reader.readCharArray(10);
                value.Location = reader.Reader.readVec4();
                value.AzimuthalRotation = reader.Reader.readFloat32();
                return value;
            }
            else {
                return _super.prototype.readValue.call(this, key, reader);
            }
        };
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        NotesAppState.prototype.writeValue = /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (key, writer, value) {
            if (key == 'Notes') {
                writer.Writer.writeCharArray(value.NoteID, 20);
                writer.Writer.writeInt32(value.NoteType);
                writer.Writer.writeCharArray(value.OwnerID, 10);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeFloat32(value.AzimuthalRotation);
            }
            else {
                _super.prototype.writeValue.call(this, key, writer, value);
            }
        };
        NotesAppState.ClusterTypeID = 'Notes';
        return NotesAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.NotesAppState = NotesAppState;
})(modelstage || (modelstage = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MessageChannel = /** @class */ (function () {
    function MessageChannel() {
    }
    /**
     * @protected
     * @param {?} message
     * @return {?}
     */
    MessageChannel.prototype.extractPart = /**
     * @protected
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var sep = message.indexOf('|');
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
    };
    /**
     * @param {?} message
     * @return {?}
     */
    MessageChannel.prototype.processMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
    };
    return MessageChannel;
}());
var SampleTheaterWebGL = /** @class */ (function (_super) {
    __extends(SampleTheaterWebGL, _super);
    function SampleTheaterWebGL(canvasElementID) {
        var _this = _super.call(this, canvasElementID) || this;
        _this.peerAppState = new modelstageappstate.LocalAppStateClusterManager(modelstage.PeerAppState.ClusterTypeID, modelstage.PeerAppState);
        _this.sceneAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.SceneAppState.ClusterTypeID, modelstage.SceneAppState);
        _this.roomAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.RoomAppState.ClusterTypeID, modelstage.RoomAppState);
        _this.notesAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.NotesAppState.ClusterTypeID, modelstage.NotesAppState);
        _this.actorIndex = 1;
        _this.channels = {};
        _this.connection = new modelstageweb.SignalRServerConnection();
        _this.scene = new modelstage.DemoSceneWebGL(_this.stage, _this.connection);
        _this.scene.initialize();
        _this.connection.onConnected(function () {
        });
        _this.connection.onMessage(function (msg) {
            if (msg.data instanceof ArrayBuffer || msg.data instanceof Uint8Array) {
                /** @type {?} */
                var buf = msg.data instanceof Uint8Array ? msg.data : new Uint8Array(msg.data);
                /** @type {?} */
                var networkMessage = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
                ((/** @type {?} */ (_this.scene))).receivedMessage(networkMessage);
            }
            else if (typeof msg.data == 'string') {
                /** @type {?} */
                var data = (/** @type {?} */ (msg.data));
                /** @type {?} */
                var sep = data.indexOf('|');
                if (sep >= 0) {
                    /** @type {?} */
                    var channelKey = data.substring(0, sep);
                    /** @type {?} */
                    var message = data.substr(sep + 1);
                    /** @type {?} */
                    var channel = _this.channels[channelKey];
                    if (channel) {
                        channel.processMessage(message);
                    }
                }
            }
            else {
                console.warn('Received invalid message type: ' + typeof msg.data);
            }
        });
        _this.interfaceController = new modelstageweb.InterfaceController();
        _this.cameraController = new modelstageweb.CameraController(_this.Stage, _this.Stage.Camera, _this.interfaceController, _this.connection);
        _this.cameraController.construct(12.0, -0.45, 0.0);
        _this.interfaceController.pushTool(new modelstage.SelectionTool(_this.scene, _this.stage, _this.connection));
        $(function () {
            _this.connection.connect();
            ((/** @type {?} */ ($('.area-right-sidebar ul li')))).draggable({
                containment: 'document',
                cursor: 'crosshair',
                helper: 'clone',
                opacity: 0.5,
                scroll: false
            });
            ((/** @type {?} */ ($('#viewCanvas')))).droppable({
            /*   over: (event, ui) => {
                   let figureID = $(ui.draggable).attr('data-figure-id');
                   //actor.Data['rotate'] = new psgeometry.Vec4(0, this.cameraController.Yaw, 0);

                   this.interfaceController.pushTool(new modelstage.PlaceActorTool(figureID, this.stage.Camera, this.connection));
               }*/
            });
        });
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    SampleTheaterWebGL.prototype.initialize = /**
     * @protected
     * @return {?}
     */
    function () {
    };
    return SampleTheaterWebGL;
}(modelstage.TheaterWebGL));

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