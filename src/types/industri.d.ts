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
    kontak: string;
    nama_kontak: string;
  };
}
