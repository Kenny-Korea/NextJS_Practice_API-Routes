import fs from "fs";
import path from "path";
export function extractPureMenuData() {
  const filePath = path.join(process.cwd(), "data", "menu.json");
  const rawData = fs.readFileSync(filePath);
  return { filePath: filePath, data: JSON.parse(rawData) };
}

function handler(req, res) {
  if (req.method === "POST") {
    const newData = {
      menuIdx: req.body.menuIdx,
      menuTitle: req.body.menuTitle,
      menuContent: req.body.menuContent,
      menuPrice: req.body.menuPrice,
      menuAvailability: req.body.menuAvailability,
      menuImage: req.body.menuImage,
    };

    const filePath = extractPureMenuData().filePath;
    const data = extractPureMenuData().data;
    data.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ menu: data });
  } else {
    const data = extractPureMenuData().data;
    res.status(200).json({ menu: data });
  }
}

export default handler;
