/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.

export module psgeometry {

    export class Matrix4 {
    elements: number[];

    static Identity = new Matrix4();

    static FromTranslation(x: number, y: number, z: number) {
      let result = new Matrix4();
      result.elements[3] = x;
      result.elements[7] = y;
      result.elements[11] = z;
      return result;
    }

    static FromScaling(x: number, y: number, z: number) {
      let result = new Matrix4();
      result.elements[0] = x;
      result.elements[5] = y;
      result.elements[10] = z;
      return result;
    }
     
    static FromRotationX(angle: number) {
      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);
      let result = new Matrix4();
      result.elements[5] = cosA;
      result.elements[6] = -sinA;
      result.elements[9] = sinA;
      result.elements[10] = cosA;
      return result;
    }
    
    static FromRotationY(angle: number) {
      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);
      let result = new Matrix4();
      result.elements[0] = cosA;
      result.elements[2] = sinA;
      result.elements[8] = -sinA;
      result.elements[10] = cosA;
      return result;
    }
        
    static FromRotationZ(angle: number) {
      let cosA = Math.cos(angle);
      let sinA = Math.sin(angle);
      let result = new Matrix4();
      result.elements[0] = cosA;
      result.elements[1] = -sinA;
      result.elements[4] = sinA;
      result.elements[5] = cosA;
      return result;
    }

    static FromRotation(pitch: number, yaw: number, roll: number) {
      return new Matrix4([
        Math.cos(yaw) * Math.cos(pitch), Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), 0,
        Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) - Math.sin(yaw) * Math.cos(roll), Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) + Math.cos(yaw) * Math.cos(roll), Math.cos(pitch) * Math.sin(roll), 0,
        Math.cos(yaw) * Math.sin(pitch) * Math.cos(roll) + Math.sin(yaw) * Math.sin(roll), Math.sin(yaw) * Math.sin(pitch) * Math.cos(roll) - Math.cos(yaw) * Math.sin(roll), Math.cos(pitch) * Math.cos(roll), 0,
        0, 0, 0, 1]
      ).transpose();
    }

    constructor(elements?: number[]) {
      this.elements = elements || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    e(colIdx: number, rowIdx: number): number {
      let idx = colIdx + (rowIdx || 0) * 4;
      return idx >= 0 && idx < 16 ? this.elements[idx] : null;
    };

    row(idx: number): Vec4 {
      if (idx >= 0 && idx < 4) {
        return new Vec4(this.elements[idx * 4], this.elements[idx * 4 + 1], this.elements[idx * 4 + 2], this.elements[idx * 4 + 3]);
      } else {
        return null;
      }
    };

    col(idx: number): Vec4 {
      if (idx <= 0 && idx < 4) {
        return new Vec4(this.elements[idx], this.elements[idx + 4], this.elements[idx + 8], this.elements[idx + 12]);
      } else {
        return null;
      }
    }

    equals(m: Matrix4) {
      if (m) {
        let l = this.elements;
        let r = m.elements;

        return l[0] == r[0] && l[1] == r[1] && l[2] == r[2] && l[3] == r[3] &&
          l[4] == r[4] && l[5] == r[5] && l[6] == r[6] && l[7] == r[7] &&
          l[8] == r[8] && l[9] == r[9] && l[10] == r[10] && l[11] == r[11] &&
          l[12] == r[12] && l[13] == r[13] && l[14] == r[14] && l[15] == r[15];
      } else {
        return false;
      }

    }

    multiply(m: Matrix4 | Vec4 | number): Matrix4 | Vec4 {
      if (m instanceof Matrix4) {
        let l = this.elements;
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
      } else if (m instanceof Vec4) {
        return new Vec4(
          m.x * this.elements[0] + m.y * this.elements[1] + m.z * this.elements[2] + m.w * this.elements[3],
          m.x * this.elements[4] + m.y * this.elements[5] + m.z * this.elements[6] + m.w * this.elements[7],
          m.x * this.elements[8] + m.y * this.elements[9] + m.z * this.elements[10] + m.w * this.elements[11],
          m.x * this.elements[12] + m.y * this.elements[13] + m.z * this.elements[14] + m.w * this.elements[15]);
      } else {
        return new Matrix4(this.elements.map(function (e) { return e * <number>m; }));
      }
    }

    toRightTriangular(): Matrix4 {
      return new Matrix4(Matrix.toRightTriangular(this.elements, 4, 4));
    }

    determinant(): number {
      let m = this.toRightTriangular();
      return m.elements[0] * m.elements[5] * m.elements[10] * m.elements[15];
    }

    isSingular(): boolean {
      return this.determinant() === 0;
    }

    transpose(): Matrix4 {
      let e = this.elements;
      return new Matrix4([
        e[0], e[4], e[8], e[12],
        e[1], e[5], e[9], e[13],
        e[2], e[6], e[10], e[14],
        e[3], e[7], e[11], e[15]
      ]);
    }

    inverse(): Matrix4 {
      if (!this.isSingular()) {
        let augmentedMatrix = [
          this.elements[0], this.elements[1], this.elements[2], this.elements[3], 1, 0, 0, 0,
          this.elements[4], this.elements[5], this.elements[6], this.elements[7], 0, 1, 0, 0,
          this.elements[8], this.elements[9], this.elements[10], this.elements[11], 0, 0, 1, 0,
          this.elements[12], this.elements[13], this.elements[14], this.elements[15], 0, 0, 0, 1
        ];

        let m = Matrix.toRightTriangular(augmentedMatrix, 4, 8);

        for (let row = 3; row >= 0; row--) {
          let divisor = m[row * 9];
          for (let col = 0; col < 8; col++) {
            m[row * 8 + col] = m[row * 8 + col] / divisor;
          }

          for (let altrow = row - 1; altrow >= 0; altrow--) {
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


  export class Matrix3 {
    elements: number[];

    constructor(elements?: number[]) {
      this.elements = elements || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    static Identity = new Matrix3();

    e(colIdx: number, rowIdx: number): number {
      let idx = colIdx + (rowIdx || 0) * 3;
      return idx >= 0 && idx < 9 ? this.elements[idx] : null;
    }

    row(idx: number): Vec3 {
      if (idx >= 0 && idx < 3) {
        return new Vec3(this.elements[idx * 3], this.elements[idx * 3 + 1], this.elements[idx * 3 + 2]);
      } else {
        return null;
      }
    }

    col(idx: number): Vec3 {
      if (idx <= 0 && idx < 3) {
        return new Vec3(this.elements[idx], this.elements[idx + 3], this.elements[idx + 6]);
      } else {
        return null;
      }
    }

    multiply(m: Matrix3 | Vec3 | number): Matrix3 | Vec3 {
      if (m instanceof Matrix3) {
        let l = this.elements;
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
      } else if (m instanceof Vec3) {
        return new Vec3(
          m.x * this.elements[0] + m.y * this.elements[1] + m.z * this.elements[2],
          m.x * this.elements[3] + m.y * this.elements[4] + m.z * this.elements[5],
          m.x * this.elements[6] + m.y * this.elements[7] + m.z * this.elements[8]);
      } else {
        return new Matrix3(this.elements.map(function (e) { return e * <number>m; }));
      }
    }

    toRightTriangular(): Matrix3 {
      return new Matrix3(Matrix.toRightTriangular(this.elements, 3, 3));
    }

    determinant(): number {
      let m = this.toRightTriangular();
      return m.elements[0] * m.elements[4] * m.elements[8];
    }

    isSingular(): boolean {
      return this.determinant() === 0;
    }

    transpose(): Matrix3 {
      let e = this.elements;
      return new Matrix3([
        e[0], e[3], e[6],
        e[1], e[4], e[7],
        e[2], e[5], e[8]
      ]);
    }

    inverse(): Matrix3 {
      if (!this.isSingular()) {
        let augmentedMatrix = [
          this.elements[0], this.elements[1], this.elements[2], 1, 0, 0,
          this.elements[3], this.elements[4], this.elements[5], 0, 1, 0,
          this.elements[6], this.elements[7], this.elements[8], 0, 0, 1,
        ];

        let m = Matrix.toRightTriangular(augmentedMatrix, 3, 6);

        for (let row = 2; row >= 0; row--) {
          let divisor = m[row * 7];
          for (let col = 0; col < 6; col++) {
            m[row * 7 + col] = m[row * 7 + col] / divisor;
          }

          for (let altrow = row - 1; altrow >= 0; altrow--) {
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

  export class Matrix {
    static toRightTriangular(elements, rows, cols) {
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

  export class Vec3 {
    x: number;
    y: number;
    z: number;

    constructor(x?, y?, z?) {
      this.x = x || 0.0;
      this.y = y || 0.0;
      this.z = z || 0.0;
    }

    asVec3() {
      return this;
    }

    asVec4(w?: number): Vec4 {
      return new Vec4(this.x, this.y, this.z, w || 1.0);
    }

    equals(v: Vec3): boolean {
      return this.x == v.x && this.y == v.y && this.z == v.z;
    }

    assignPoint(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    assignVec(v: Vec3 | Vec4) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
    }

    add(vec: Vec3 | Vec4): Vec3 {
      return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    sub(vec: Vec3 | Vec4): Vec3 {
      return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    dot(vec: Vec3 | Vec4): number {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    cross(v: Vec3 | Vec4) {
      return new Vec3(
        (this.y * v.z) - (this.z * v.y),
        (this.z * v.x) - (this.x * v.z),
        (this.x * v.y) - (this.y * v.x)
      );
    }

    multiply(s: number) {
      return new Vec3(this.x * s, this.y * s, this.z * s);
    }

    applyQuaternion(q: Quaternion) {
      let x = this.x;
      let y = this.y;
      let z = this.z;

      let qx = q.x;
      let qy = q.y;
      let qz = q.z;
      let qw = q.w;

      // quaternion * vector
      let px = qw * x + qy * z - qz * y;
      let py = qw * y + qz * x - qx * z;
      let pz = qw * z + qx * y - qy * x;
      let pw = -qx * x - qy * y - qz * z;

      // product * inverse quaternion
      this.x = px * qw - pw * qx - py * qz + pz * qy;
      this.y = py * qw - pw * qy - pz * qx + px * qz;
      this.z = pz * qw - pw * qz - px * qy + py * qx;

      return this;
    }

    norm() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
      return this.multiply(1 / this.norm());
    }

    elements() {
      return [this.x, this.y, this.z];
    }

    squaredDist(v: Vec3 | Vec4) {
      return (this.x - v.x) * (this.x - v.x) +
        (this.y - v.y) * (this.y - v.y) +
        (this.z - v.z) * (this.z - v.z);
    }
  }

  export class Vec4 {
    x: number;
    y: number;
    z: number;
    w: number;

    public static Zero = new Vec4(0.0, 0.0, 0.0, 0.0);

    public static One = new Vec4(1.0, 1.0, 1.0, 1.0);

    constructor(x?, y?, z?, w?) {
      this.x = x || 0.0;
      this.y = y || 0.0;
      this.z = z || 0.0;
      this.w = w || 0.0;
    }

    equals(v: Vec4): boolean {
      return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
    }

    asVec3(): Vec3 {
      return new Vec3(this.x, this.y, this.z);
    }

    asVec4(): Vec4 {
      return this;
    }

    add(vec: Vec4): Vec4 {
      return new Vec4(this.x + vec.x, this.y + vec.y, this.z + vec.z, this.w + vec.w);
    }

    sub(vec: Vec4): Vec4 {
      return new Vec4(this.x - vec.x, this.y - vec.y, this.z - vec.z, this.w - vec.w);
    }

    dot(vec: Vec4): number {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
    }

    cross(v: Vec4): Vec4 {
      return new Vec4(
        (this.y * v.z) - (this.z * v.y),
        (this.z * v.x) - (this.x * v.z),
        (this.x * v.y) - (this.y * v.x),
        1.0
      );
    }

    multiply(s: number): Vec4 {
      return new Vec4(this.x * s, this.y * s, this.z * s, this.w * s);
    }

    norm(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    normalize(): Vec4 {
      return this.multiply(1 / this.norm());
    }

    elements(): number[] {
      return [this.x, this.y, this.z, this.w];
    }

    squaredDist(v: Vec4) {
      return (this.x - v.x) * (this.x - v.x) +
        (this.y - v.y) * (this.y - v.y) +
        (this.z - v.z) * (this.z - v.z) +
        (this.w - v.w) * (this.w - v.w);
    }
  }

  export class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x?: number, y?: number, z?: number, w?: number) {
      this.x = x || 0.0;
      this.y = y || 0.0;
      this.z = z || 0.0;
      this.w = typeof w == 'undefined' ? 1.0 : w;
    }

    setFromAxisAngle(axis: Vec3, angle: number): Quaternion {
      let halfAngle = angle / 2;
      let s = Math.sin(halfAngle);

      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(halfAngle);

      return this;
    }

    multiply(q: Quaternion) {
      let x = this.x, y = this.y, z = this.z, w = this.w;
      let qx = q.x, qy = q.y, qz = q.z, qw = q.w;

      this.x = x * qw + w * qx + y * qz - z * qy;
      this.y = y * qw + w * qy + z * qx - x * qz;
      this.z = z * qw + w * qz + x * qy - y * qx;
      this.w = w * qw - x * qx - y * qy - z * qz;
    }
  }

  export class AABB3D {
    public minX: number = +Infinity;
    public maxX: number = -Infinity;
    public minY: number = +Infinity;
    public maxY: number = -Infinity;
    public minZ: number = +Infinity;
    public maxZ: number = -Infinity;

    public addPoint(x: number, y: number, z: number) {
      this.minX = Math.min(this.minX, x);
      this.maxX = Math.max(this.maxX, x);
      this.minY = Math.min(this.minY, y);
      this.maxY = Math.max(this.maxY, y);
      this.minZ = Math.min(this.minZ, z);
      this.maxZ = Math.max(this.maxZ, z);
    }

    public addVector(v: Vec3 | Vec4) {
      this.addPoint(v.x, v.y, v.z);
    }

    public addAABB(box: AABB3D) {
      this.addPoint(box.minX, box.minY, box.minZ);
      this.addPoint(box.maxX, box.maxY, box.maxZ);
    }

    public clear() {
      this.minX = +Infinity;
      this.maxX = -Infinity;
      this.minY = +Infinity;
      this.maxY = -Infinity;
      this.minZ = +Infinity;
      this.maxZ = -Infinity;
    }

    public center(): Vec3 {
      return new Vec3(
        .5 * (this.minX + this.maxX),
        .5 * (this.minY + this.maxY),
        .5 * (this.minZ + this.maxZ)
      );
    }

    public extents(): Vec3 {
      return new Vec3(
        (this.maxX - this.minX),
        (this.maxY - this.minY),
        (this.maxZ - this.minZ)
      );
    }

    public min(): Vec3 {
      return new Vec3(
        this.minX,
        this.minY,
        this.minZ
      );
    }

    public max(): Vec3 {
      return new Vec3(
        this.maxX,
        this.maxY,
        this.maxZ
      );
    }

    public contains(v: Vec3 | Vec4) {
      return v.x >= this.minX && v.x <= this.maxX &&
        v.y >= this.minY && v.y <= this.maxY &&
        v.z >= this.minZ && v.z <= this.maxZ;
    }

    public transform(matrix: Matrix4): AABB3D {
      let result = new AABB3D();

      let minV = <Vec4>matrix.multiply(new Vec4(this.minX, this.minY, this.minZ, 1));
      let maxV = <Vec4>matrix.multiply(new Vec4(this.maxX, this.maxY, this.maxZ, 1));

      result.minX = minV.x; result.minY = minV.y; result.minZ = minV.z;
      result.maxX = maxV.x; result.maxY = maxV.y; result.maxZ = maxV.z;

      return result;
    }

    public intersectsRay(ray: Line3D): Vec3 {
      let result: Vec3 = null;

      let v0 = ray.p0.asVec3();
      let dir = ray.p1.asVec3().sub(ray.p0.asVec3());

      let intX0 = ray.intersectRayWithPlane(new Vec3(this.minX, 0, 0), new Vec3(-1, 0, 0));
      let intX1 = ray.intersectRayWithPlane(new Vec3(this.maxX, 0, 0), new Vec3(1, 0, 0));
      let intY0 = ray.intersectRayWithPlane(new Vec3(0, this.minY, 0), new Vec3(0, -1, 0));
      let intY1 = ray.intersectRayWithPlane(new Vec3(0, this.maxY, 0), new Vec3(0, 1, 0));
      let intZ0 = ray.intersectRayWithPlane(new Vec3(0, 0, this.minZ), new Vec3(0, 0, -1));
      let intZ1 = ray.intersectRayWithPlane(new Vec3(0, 0, this.maxZ), new Vec3(0, 0, 1));

      let currDist = Infinity;
      if (intX0 && this.contains(intX0)) { currDist = v0.squaredDist(intX0); result = intX0; }
      if (intX1 && this.contains(intX1) && v0.squaredDist(intX1) < currDist) { currDist = v0.squaredDist(intX1); result = intX1; }
      if (intY0 && this.contains(intY0) && v0.squaredDist(intY0) < currDist) { currDist = v0.squaredDist(intY0); result = intY0; }
      if (intY1 && this.contains(intY1) && v0.squaredDist(intY1) < currDist) { currDist = v0.squaredDist(intY1); result = intY1; }
      if (intZ0 && this.contains(intZ0) && v0.squaredDist(intZ0) < currDist) { currDist = v0.squaredDist(intZ0); result = intZ0; }
      if (intZ1 && this.contains(intZ1) && v0.squaredDist(intZ1) < currDist) { currDist = v0.squaredDist(intZ1); result = intZ1; }

      return result;
    }
  }

  export class Point3D {
    x: number;
    y: number;
    z: number;

    constructor(x?, y?, z?) {
      this.x = x || 0.0;
      this.y = y || 0.0;
      this.z = z || 0.0;
    }

    asVec3(): Vec3 {
      return new Vec3(this.x, this.y, this.z);
    }

    asVec4(w?: number): Vec4 {
      return new Vec4(this.x, this.y, this.z, w || 1.0);
    }
  }

  export class Line3D {
    p0: Point3D;
    p1: Point3D;

    constructor(p0, p1) {
      this.p0 = p0 || new Point3D();
      this.p1 = p1 || new Point3D();
    }

    public intersectRayWithPlane(v0: Vec3, n: Vec3): Vec3 {
      let result: Vec3 = null;

      let u = this.p1.asVec3().sub(this.p0.asVec3());

      let D = n.dot(u);
      if (D != 0) {
        let w = this.p0.asVec3().sub(v0);
        let N = -n.dot(w);
        let sI = N / D;

        if (sI >= 0) {
          result = this.p0.asVec3().add(u.multiply(sI));
        }
      }

      return result;
    }

    intersectTriangle(p0, p1, p2) {
      let matrix = new Matrix3([
        this.p0.x - this.p1.x, p1.x - p0.x, p2.x - p0.x,
        this.p0.y - this.p1.y, p1.y - p0.y, p2.y - p0.y,
        this.p0.z - this.p1.z, p1.z - p0.z, p2.z - p0.z
      ]).inverse();

      if (matrix) {
        let res = matrix.multiply(this.p0.asVec3().sub(p0.asVec3()));
        if (res && (<Vec3>res).y >= 0 && (<Vec3>res).y <= 1.0 && (<Vec3>res).z >= 0 && (<Vec3>res).z <= 1.0 && (<Vec3>res).y + (<Vec3>res).z <= 1.0) {
          return p0.asVec3()
            .add(p1.asVec3().sub(p0.asVec3()).multiply((<Vec3>res).y))
            .add(p2.asVec3().sub(p0.asVec3()).multiply((<Vec3>res).z));
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    transform(matrix: Matrix4) {
      let v0 = <Vec4>matrix.multiply(this.p0.asVec4());
      let v1 = <Vec4>matrix.multiply(this.p1.asVec4());
      return new Line3D(new Point3D(v0.x, v0.y, v0.z), new Point3D(v1.x, v1.y, v1.z));
    }
  }

  export class Camera {
    private _position: Vec3;
    private _direction: Vec3;
    private _up: Vec3;

    private currentViewMatrix: Matrix4;

    constructor(position?: Vec3, direction?: Vec3, up?: Vec3) {
      this._position = position || new Vec3(0.0, 0.0, 20.0);
      this._direction = direction || new Vec3(0.0, 0.0, -1.0);
      this._up = up || new Vec3(0.0, 1.0, 0.0);
    }

    changed() {
      this.currentViewMatrix = null;
    }

    setPosition(x?: number, y?: number, z?: number) {
      this._position.x = x || 0.0;
      this._position.y = y || 0.0;
      this._position.z = z || 0.0;
      this.changed();
    }

    setDirection(x: number, y: number, z: number) {
      this._direction.x = x;
      this._direction.y = y;
      this._direction.z = z;
      this.changed();
    }

    setCenter(x: number, y: number, z: number) {
      this._direction.x = x - this._position.x;
      this._direction.y = y - this._position.y;
      this._direction.z = z - this._position.z;
      this.changed();
    }

    getPosition(): Vec3 {
      return this._position;
    }

    asVec3(): Vec3 {
      return this._position;
    }

    asVec4(): Vec4 {
      return this._position.asVec4();
    }

    getProjectionMatrix(width, height): Matrix4 {
      return this.makePerspective(45, width / height, 0.1, 10000.0);
    }

    getViewMatrix(): Matrix4 {
      return <psgeometry.Matrix4>this.makeLookAt();
    }

    private makePerspective(fovy, aspect, znear, zfar): Matrix4 {
      let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
      let ymin = -ymax;
      let xmin = ymin * aspect;
      let xmax = ymax * aspect;

      return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
    }

    private makeFrustum(left, right,
      bottom, top,
      znear, zfar): Matrix4 {
      let x = 2 * znear / (right - left);
      let y = 2 * znear / (top - bottom);
      let a = (right + left) / (right - left);
      let b = (top + bottom) / (top - bottom);
      let c = -(zfar + znear) / (zfar - znear);
      let d = -2 * zfar * znear / (zfar - znear);

      return new Matrix4(
        [x, 0, a, 0,
          0, y, b, 0,
          0, 0, c, d,
          0, 0, -1, 0]);
    }

    private makeOrtho(left, right, bottom, top, znear, zfar): Matrix4 {
      let tx = -(right + left) / (right - left);
      let ty = -(top + bottom) / (top - bottom);
      let tz = -(zfar + znear) / (zfar - znear);

      return new Matrix4(
        [2 / (right - left), 0, 0, tx,
          0, 2 / (top - bottom), 0, ty,
          0, 0, -2 / (zfar - znear), tz,
          0, 0, 0, 1]);
    }

    private makeLookAt(): Matrix4 {
      let eye = this._position;
      let center = this._position.add(this._direction);
      let up = this._up;

      let z = eye.sub(center).normalize();
      let x = up.cross(z).normalize();
      let y = z.cross(x).normalize();

      let m = new Matrix4([
        x.x, x.y, x.z, 0,
        y.x, y.y, y.z, 0,
        z.x, z.y, z.z, 0,
        0, 0, 0, 1]);

      let t = new Matrix4([
        1, 0, 0, -eye.x,
        0, 1, 0, -eye.y,
        0, 0, 1, -eye.z,
        0, 0, 0, 1]);

      return <Matrix4>t.multiply(m);
    }
  }

  function pointInTriangle(p, a, b, c): boolean {
    // Compute vectors        
    let v0 = c.subtract(a);
    let v1 = b.subtract(a);
    let v2 = p.subtract(a);

    // Compute dot products
    let dot00 = v0.dot(v0)
    let dot01 = v0.dot(v1)
    let dot02 = v0.dot(v2)
    let dot11 = v1.dot(v1)
    let dot12 = v1.dot(v2)

    // Compute barycentric coordinates
    let invDenom = 1 / (dot00 * dot11 - dot01 * dot01)
    let u = (dot11 * dot02 - dot01 * dot12) * invDenom
    let v = (dot00 * dot12 - dot01 * dot02) * invDenom

    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
  }


  export class Vec2 {
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
      this.x = x || 0.0;
      this.y = y || 0.0;
    }

    public sub(v: Vec2) {
      return new Vec2(this.x - v.x, this.y - v.y);
    }

    public static insideTri(a: Vec2, b: Vec2, c: Vec2, p: Vec2) {
      return Vec2.cross(c.sub(b), p.sub(b)) >= .0 &&
        Vec2.cross(a.sub(c), p.sub(c)) >= .0 &&
        Vec2.cross(b.sub(a), p.sub(a)) >= .0;
    };

    public static cross(v0: Vec2, v1: Vec2): number {
      return v0.x * v1.y - v0.y * v1.x;
    }

  }

  export class Polygon2D {

    private static Epsilon = 1e-10;

    private vertices: Array<Vec2> = [];

    public get Vertices() {
      return this.vertices;
    }

    public addVertex(x: number, y: number) {
      this.vertices.push(new Vec2(x, y));
    }

    public addVector(v: Vec2) {
      this.vertices.push(v);
    }

    public addToAABB(box: AABB2D) {
      this.vertices.forEach((p) => {
        box.addVector(p);
      });
    }

    public clear() {
      this.vertices.length = 0;
    }

    public getArea(): number {
      // see: https://stackoverflow.com/a/1165943
      let result = 0;

      let n = this.vertices.length;
      for (let i = n - 1, q = 0; q < n; i = q++) {
        result += this.vertices[i].x * this.vertices[q].y - this.vertices[q].x * this.vertices[i].y;
      }

      return result * 0.5;
    }



    private snip(u: number, v: number, w: number, n: number, indices: Array<number>) {
      let result;

      let a = this.vertices[indices[u]];
      let b = this.vertices[indices[v]];
      let c = this.vertices[indices[w]];
      let p: Vec2;

      result = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > Polygon2D.Epsilon;

      for (let i = 0; i < n && result; ++i) {
        if ((i != u) && (i != v) && (i != w)) {
          p = this.vertices[indices[i]];
          result = !Vec2.insideTri(a, b, c, p);
        }
      }

      return result;
    }

    public triangulate(): Polygon2D {
      let result = new Polygon2D();

      let n = this.vertices.length;

      if (n > 2) {
        let indices: Array<number> = [];

        if (this.getArea() > .0) {
          for (let i = 0; i < n; ++i) indices[i] = i;
        } else {
          for (let i = 0; i < n; ++i) indices[i] = (n - 1) - i;
        }

        let nv = n;

        /*  remove nv-2 Vertices, creating 1 triangle every time */
        let count = 2 * nv;   /* error detection */

        for (let m = 0, v = nv - 1; nv > 2;) {
          /* if we loop, it is probably a non-simple polygon */
          if (0 >= count--) {
            return new Polygon2D();
          }

          /* three consecutive vertices in current polygon, <u,v,w> */
          let u = v; if (nv <= u) u = 0;     /* previous */
          v = u + 1; if (nv <= v) v = 0;     /* new v    */
          let w = v + 1; if (nv <= w) w = 0;     /* next     */

          if (this.snip(u, v, w, nv, indices)) {
            let a, b, c, s, t;

            /* true names of the vertices */
            a = indices[u]; b = indices[v]; c = indices[w];

            /* output Triangle */
            result.addVector(this.vertices[c]);
            result.addVector(this.vertices[b]);
            result.addVector(this.vertices[a]);

            ++m;

            /* remove v from remaining polygon */
            for (s = v, t = v + 1; t < nv; s++ , t++) {
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

  export class AABB2D {
    public minX: number = +Infinity;
    public maxX: number = -Infinity;
    public minY: number = +Infinity;
    public maxY: number = -Infinity;

    public addPoint(x: number, y: number) {
      this.minX = Math.min(this.minX, x);
      this.maxX = Math.max(this.maxX, x);
      this.minY = Math.min(this.minY, y);
      this.maxY = Math.max(this.maxY, y);
    }

    public addVector(v: Vec2 | Vec3 | Vec4) {
      this.addPoint(v.x, v.y);
    }

    public addAABB(box: AABB2D) {
      this.addPoint(box.minX, box.minY);
      this.addPoint(box.maxX, box.maxY);
    }

    public clear() {
      this.minX = +Infinity;
      this.maxX = -Infinity;
      this.minY = +Infinity;
      this.maxY = -Infinity;
    }

    public center(): Vec2 {
      return new Vec2(
        .5 * (this.minX + this.maxX),
        .5 * (this.minY + this.maxY)
      );
    }

    public extents(): Vec2 {
      return new Vec2(
        (this.maxX - this.minX),
        (this.maxY - this.minY)
      );
    }

    public min(): Vec2 {
      return new Vec2(
        this.minX,
        this.minY
      );
    }

    public max(): Vec2 {
      return new Vec2(
        this.maxX,
        this.maxY
      );
    }

    public contains(v: Vec2 | Vec3 | Vec4) {
      return v.x >= this.minX && v.x <= this.maxX &&
        v.y >= this.minY && v.y <= this.maxY
    }
  }

  /** Represents a point in 3D space using spherical coordinates.
   */
  export class Spherical {

    public r = 0;
    public azimuth = 0;
    public polar = 0;

    public constructor(r: number, azimuth: number, polar: number) {
      this.r = r;
      this.azimuth = azimuth;
      this.polar = polar;
    }

    /** Converts cartesian coordinates x,y,z to spherical coordinates.
      */
    public static FromCartesian(x: number, y: number, z: number): Spherical {
      let r = Math.sqrt(x * x + y * y + z * z);
      return new Spherical(
        r,
        Math.asin(y / r),
        Math.atan2(-x, z));
    }

    /** Converts cartesian vector to spherical coordinates.
      */
    public static FromCartesianVector(v: Vec4 | Vec3) {
      return Spherical.FromCartesian(v.x, v.y, v.z);
    }

    /** Converts spherical coordinates to cartesian vector.
      */
    public static ToCartesian(r: number, polar: number, azimuth: number): Vec4 {
      return new Vec4(r * Math.cos(polar) * Math.sin(azimuth),
        -r * Math.sin(polar),
        -r * Math.cos(polar) * Math.cos(azimuth));
    }

    /** Converts spherical coordinates to cartesian vector.
      */
    public toCartesian(): Vec4 {
      return new Vec4(this.r * Math.cos(this.polar) * Math.sin(this.azimuth),
        -this.r * Math.sin(this.polar),
        -this.r * Math.cos(this.polar) * Math.cos(this.azimuth));
    }

    }
}
