interface WisataI {
  attributes: {
    nama: string;
    lokasi: string;
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
