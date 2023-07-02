interface IndustriI {
  attributes: {
    nama: string;
    foto: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
    deskripsi: string;
  };
}
