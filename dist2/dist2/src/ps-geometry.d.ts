export declare module psgeometry {
    class Matrix4 {
        elements: number[];
        static Identity: Matrix4;
        static FromTranslation(x: number, y: number, z: number): Matrix4;
        static FromScaling(x: number, y: number, z: number): Matrix4;
        static FromRotationX(angle: number): Matrix4;
        static FromRotationY(angle: number): Matrix4;
        static FromRotationZ(angle: number): Matrix4;
        static FromRotation(pitch: number, yaw: number, roll: number): Matrix4;
        constructor(elements?: number[]);
        e(colIdx: number, rowIdx: number): number;
        row(idx: number): Vec4;
        col(idx: number): Vec4;
        equals(m: Matrix4): boolean;
        multiply(m: Matrix4 | Vec4 | number): Matrix4 | Vec4;
        toRightTriangular(): Matrix4;
        determinant(): number;
        isSingular(): boolean;
        transpose(): Matrix4;
        inverse(): Matrix4;
    }
    class Matrix3 {
        elements: number[];
        constructor(elements?: number[]);
        static Identity: Matrix3;
        e(colIdx: number, rowIdx: number): number;
        row(idx: number): Vec3;
        col(idx: number): Vec3;
        multiply(m: Matrix3 | Vec3 | number): Matrix3 | Vec3;
        toRightTriangular(): Matrix3;
        determinant(): number;
        isSingular(): boolean;
        transpose(): Matrix3;
        inverse(): Matrix3;
    }
    class Matrix {
        static toRightTriangular(elements: any, rows: any, cols: any): any;
    }
    class Vec3 {
        x: number;
        y: number;
        z: number;
        constructor(x?: any, y?: any, z?: any);
        asVec3(): this;
        asVec4(w?: number): Vec4;
        equals(v: Vec3): boolean;
        assignPoint(x: any, y: any, z: any): void;
        assignVec(v: Vec3 | Vec4): void;
        add(vec: Vec3 | Vec4): Vec3;
        sub(vec: Vec3 | Vec4): Vec3;
        dot(vec: Vec3 | Vec4): number;
        cross(v: Vec3 | Vec4): Vec3;
        multiply(s: number): Vec3;
        applyQuaternion(q: Quaternion): this;
        norm(): number;
        normalize(): Vec3;
        elements(): number[];
        squaredDist(v: Vec3 | Vec4): number;
    }
    class Vec4 {
        x: number;
        y: number;
        z: number;
        w: number;
        static Zero: Vec4;
        static One: Vec4;
        constructor(x?: any, y?: any, z?: any, w?: any);
        equals(v: Vec4): boolean;
        asVec3(): Vec3;
        asVec4(): Vec4;
        add(vec: Vec4): Vec4;
        sub(vec: Vec4): Vec4;
        dot(vec: Vec4): number;
        cross(v: Vec4): Vec4;
        multiply(s: number): Vec4;
        norm(): number;
        normalize(): Vec4;
        elements(): number[];
        squaredDist(v: Vec4): number;
    }
    class Quaternion {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
        setFromAxisAngle(axis: Vec3, angle: number): Quaternion;
        multiply(q: Quaternion): void;
    }
    class AABB3D {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
        minZ: number;
        maxZ: number;
        addPoint(x: number, y: number, z: number): void;
        addVector(v: Vec3 | Vec4): void;
        addAABB(box: AABB3D): void;
        clear(): void;
        center(): Vec3;
        extents(): Vec3;
        min(): Vec3;
        max(): Vec3;
        contains(v: Vec3 | Vec4): boolean;
        transform(matrix: Matrix4): AABB3D;
        intersectsRay(ray: Line3D): Vec3;
    }
    class Point3D {
        x: number;
        y: number;
        z: number;
        constructor(x?: any, y?: any, z?: any);
        asVec3(): Vec3;
        asVec4(w?: number): Vec4;
    }
    class Line3D {
        p0: Point3D;
        p1: Point3D;
        constructor(p0: any, p1: any);
        intersectRayWithPlane(v0: Vec3, n: Vec3): Vec3;
        intersectTriangle(p0: any, p1: any, p2: any): any;
        transform(matrix: Matrix4): Line3D;
    }
    class Camera {
        private _position;
        private _direction;
        private _up;
        private currentViewMatrix;
        constructor(position?: Vec3, direction?: Vec3, up?: Vec3);
        changed(): void;
        setPosition(x?: number, y?: number, z?: number): void;
        setDirection(x: number, y: number, z: number): void;
        setCenter(x: number, y: number, z: number): void;
        getPosition(): Vec3;
        asVec3(): Vec3;
        asVec4(): Vec4;
        getProjectionMatrix(width: any, height: any): Matrix4;
        getViewMatrix(): Matrix4;
        private makePerspective;
        private makeFrustum;
        private makeOrtho;
        private makeLookAt;
    }
    class Vec2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        sub(v: Vec2): Vec2;
        static insideTri(a: Vec2, b: Vec2, c: Vec2, p: Vec2): boolean;
        static cross(v0: Vec2, v1: Vec2): number;
    }
    class Polygon2D {
        private static Epsilon;
        private vertices;
        readonly Vertices: Vec2[];
        addVertex(x: number, y: number): void;
        addVector(v: Vec2): void;
        addToAABB(box: AABB2D): void;
        clear(): void;
        getArea(): number;
        private snip;
        triangulate(): Polygon2D;
    }
    class AABB2D {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
        addPoint(x: number, y: number): void;
        addVector(v: Vec2 | Vec3 | Vec4): void;
        addAABB(box: AABB2D): void;
        clear(): void;
        center(): Vec2;
        extents(): Vec2;
        min(): Vec2;
        max(): Vec2;
        contains(v: Vec2 | Vec3 | Vec4): boolean;
    }
    /** Represents a point in 3D space using spherical coordinates.
     */
    class Spherical {
        r: number;
        azimuth: number;
        polar: number;
        constructor(r: number, azimuth: number, polar: number);
        /** Converts cartesian coordinates x,y,z to spherical coordinates.
          */
        static FromCartesian(x: number, y: number, z: number): Spherical;
        /** Converts cartesian vector to spherical coordinates.
          */
        static FromCartesianVector(v: Vec4 | Vec3): Spherical;
        /** Converts spherical coordinates to cartesian vector.
          */
        static ToCartesian(r: number, polar: number, azimuth: number): Vec4;
        /** Converts spherical coordinates to cartesian vector.
          */
        toCartesian(): Vec4;
    }
}
