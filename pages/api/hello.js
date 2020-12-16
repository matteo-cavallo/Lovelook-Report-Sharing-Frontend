// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const data = await fetch(
    "https://arcane-temple-75010.herokuapp.com/orders/m.cavallo1011@gmail.com"
  ).then((res) => res.json());

  res.json(data);
};
