interface WisataI {
  id: string;
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
