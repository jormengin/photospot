declare namespace NodeJS {
    interface Global {
      mongooseConn: {
        conn: any;
        promise: Promise<any>;
      }
    }
  }