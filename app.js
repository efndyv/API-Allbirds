const express = require("express");
const Joi = require("joi");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/image");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/avif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/*********MIDDLEWARE**********/

app.use(express.json());
app.use(cors());
app.use("/assets/image", express.static("assets/image"));

/*********ROUTES**********/

const fakeSliderData = [
  {
    id: 100,
    img: "http://localhost:5000/assets/image/slide/1.avif",
  },
  {
    id: 101,
    img: "http://localhost:5000/assets/image/slide/2.avif",
  },
  {
    id: 102,
    img: "http://localhost:5000/assets/image/slide/3.avif",
  },
  {
    id: 103,
    img: "http://localhost:5000/assets/image/slide/4.avif",
  },
  {
    id: 104,
    img: "http://localhost:5000/assets/image/slide/5.avif",
  },
  {
    id: 105,
    img: "http://localhost:5000/assets/image/slide/6.avif",
  },
  {
    id: 106,
    img: "http://localhost:5000/assets/image/slide/7.avif",
  },
  {
    id: 107,
    img: "http://localhost:5000/assets/image/slide/8.avif",
  },
];

const productsData = [
  {
    id: uuidv4(),
    link: "/women",
    title: "Women's Tree Dasher 2",

    price: "135",
    img: "http://localhost:5000/assets/image/cardcarousel/Lounger_Lift_Natural_White_Hanami_Night_Twilight_White.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/men",
    title: "Men's Tree Loungers",

    price: "100",
    img: "http://localhost:5000/assets/image/cardcarousel/MENS_TREE_RUNNER_NAVY_NIGHT_DARK_NAVY.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/women",
    title: "Women's Loungers Lift",

    price: "105",
    img: "http://localhost:5000/assets/image/cardcarousel/Trail_Runner_SWT_Blizzard_Hanami_Night_Blizzard.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/men",
    title: "Men's Trail Runners",

    price: "140",
    img: "http://localhost:5000/assets/image/cardcarousel/8.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/women",
    title: "Women's Tree Runners",

    price: "98",
    img: "http://localhost:5000/assets/image/cardcarousel/Tree_Dasher_2_Blizzard_Hanami_Night_Natural_White.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/men",
    title: "Men's Tree Runners",

    price: "98",
    img: "http://localhost:5000/assets/image/cardcarousel/Tree_Lounger_Hanami_Night_Natural_White.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/women",
    title: "Women's Tree Breezers",

    price: "100",
    img: "http://localhost:5000/assets/image/cardcarousel/WOMENS_TREE_BREEZER_JET_BLACK_BLACK.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/men",
    title: "Men's Tree Runner Go",

    price: "120",
    img: "http://localhost:5000/assets/image/cardcarousel/Hanami_Night_Natural_White_1.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/men",
    title: "Men's Tree Dasher Relay",

    price: "120",
    img: "http://localhost:5000/assets/image/cardcarousel/5.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/men",
    title: "Men's Tree Toppers",

    price: "120",
    img: "http://localhost:5000/assets/image/cardcarousel/sear.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/women",
    title: "Women's Tree Toppers ",
    price: "110",
    img: "http://localhost:5000/assets/image/cardcarousel/2.avif",
    sliderData: fakeSliderData,
  },
  {
    id: uuidv4(),
    link: "/women",
    title: "Women's Tree Toppers 2",
    price: "110",
    img: "http://localhost:5000/assets/image/cardcarousel/1.avif",
    sliderData: fakeSliderData,
  },
];

/***********************************************************/
/********* GET: ALL PRODUCTS **********/
/***********************************************************/

app.get("/api/products", (req, res) => {
  res.send(productsData);
});

/***********************************************************/
/********* GET: SINGLE PRODUCT **********/
/***********************************************************/

app.get("/api/products/:id", (req, res) => {
  const product = productsData.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }
  res.send(product);
});

/***********************************************************/
/********* POST: ADD PRODUCT **********/
/***********************************************************/

app.post("/api/products", upload.single("img"), (req, res) => {
  const product = {
    id: uuidv4(),
    title: req.body.title,
    link: req.body.isMale == "true" ? "/men" : "/women",
    // details: req.body.details,
    price: req.body.price,
    img: `http://localhost:5000\\${req.file.path}`,
    sliderData: fakeSliderData,
  };

  productsData.push(product);
  res.send(product);
});

/***********************************************************/
/********* PUT: UPDATE PRODUCT **********/
/***********************************************************/

app.put("/api/products/:id", upload.single("img"), (req, res) => {
  //Find product
  const product = productsData.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }

  product.title = req.body.title;

  product.price = req.body.price;
  product.link = req.body.isMale ? "/men" : "/women";
  console.log(req.body);
  console.log(req.file);

  if (req.file) {
    product.img = `http://localhost:5000\\${req.file.path}`;
  }

  res.send(product);
});

/***********************************************************/
/********* DELETE: DELETE PRODUCT **********/
/***********************************************************/

app.delete("/api/products/:id", (req, res) => {
  const product = productsData.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }
  const index = productsData.indexOf(product);
  productsData.splice(index, 1);

  res.send(productsData);
});

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    price: Joi.number().required(),
    img: Joi.string().required(),
  });

  return schema.validate(product);
}

function validateUpdateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    price: Joi.number().required(),
    img: Joi.string(),
  });

  return schema.validate(product);
}

/********* PORT **********/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `http://localhost:${PORT} - dinlənilir...\n\n~~~Məhsullar~~~\n\nBütün məshullar üçün endpoint - /api/products\nTək məhsul üçün endpoint - /api/products/id\nYeni məhsul yaratmaq üçün endpoint - /api/products\n\nYeni məhsulun qəbul olunan formatı:\n{\nname: "string",\ndetails: "string",\nprice: "string",\nproductImage: "base64"\n}\n\nOlan məhsulu dəyişdirmək üçün endpoint - /api/products/id\n\nOlan məhsulu dəyişmək üçün qəbul olunan format:\n{\nname: "string",\ndetails: "string",\nprice: "string",\nproductImage: "base64"\n}\n\nMəhsulu silmək üçün endpoint - api/products/id\n\n\nAPI tədris məqsədi ilə istifadə olunmaq üçün yaradılıb.\nTərlan Əlicanov © 2023`
  )
);
