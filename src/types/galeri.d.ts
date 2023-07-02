interface GaleriI {
  attributes: {
    judul: string;
    foto: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    deskripsi: string | null;
  };
}
