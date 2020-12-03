declare namespace Express {
  interface Request {
    adminToken?: {
      _id: import("mongoose").Types.ObjectId;
      updatedAt: number;
    };
    certificationInfo?: {
      name: string;
      phone: string;
      unique_in_site: string;
    };
  }
}
