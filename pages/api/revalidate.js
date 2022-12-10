export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const model = req.body.model;
  const slug = req.body.entry.slug;

  console.log("Model: " + model);
  console.log(`path to revalidate: ${slug}`);

  let pathToRevalidate = "";

  switch (model) {
    case "homepagina":
      pathToRevalidate = `/`;
      break
    case "pagina":
      pathToRevalidate = `/${slug}`;
      break
    case "ruimtes":
      pathToRevalidate = `/ruimte-huren`;
      break
    case "abonnementen":
      pathToRevalidate = `/membership`;
      break
    case "communitymembers":
      pathToRevalidate = `/community`;
      break
    case "algemeen":
      break
    default:
      break;
  }

  if (pathToRevalidate === '') return
  console.log(pathToRevalidate);

  try {
    await res.revalidate(pathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}