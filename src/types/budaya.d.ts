interface BudayaI {
  id: string;
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
