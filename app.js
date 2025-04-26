const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const users = [
  {
    fullname: "Alice Johnson",
    email: "admin@example.com",
    role: "admin",
    password: bcrypt.hashSync("admin123", 10),
  },
  {
    fullname: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    password: bcrypt.hashSync("BobPassword456!", 10),
  },
  {
    fullname: "Charlie Kim",
    email: "charlie@example.com",
    role: "user",
    password: bcrypt.hashSync("Charlie789#", 10),
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

app.post("/api/auth/register", (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  if (fullname.trim() === "")
    return res.status(400).send("Ad yazmağınız tələb olunur");
  if (email.trim() === "")
    return res.status(400).send("Email yazmağınız tələb olunur");
  if (password.trim() === "")
    return res.status(400).send("Şifrə yazmağınız tələb olunur");
  if (password !== confirmPassword) {
    return res.status(400).send("Şifrə eyni deyil");
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = {
      fullname,
      email,
      password: hashedPassword,
      role: "user",
    };
    users.push(newUser);
    res.send("İstifadəçi qeydiyyatı tamamlandı.");
  } catch (error) {
    res.status(500).send("Xəta registerUser: " + error.message);
  }
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((user) => user.email === email);
    console.log(user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Yalnış email və ya şifrə");
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      // process.env.JWT_SECRET,
      "salam123",
      { expiresIn: "1w" }
    );
    res.send({ token });
  } catch (error) {
    res.status(500).send("Xəta loginUser: " + error.message);
  }
});

/********* PORT **********/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `http://localhost:${PORT} - dinlənilir...\n\n~~~Məhsullar~~~\n\nBütün məshullar üçün endpoint - /api/products\nTək məhsul üçün endpoint - /api/products/id\nYeni məhsul yaratmaq üçün endpoint - /api/products\n\nYeni məhsulun qəbul olunan formatı:\n{\nname: "string",\ndetails: "string",\nprice: "string",\nproductImage: "base64"\n}\n\nOlan məhsulu dəyişdirmək üçün endpoint - /api/products/id\n\nOlan məhsulu dəyişmək üçün qəbul olunan format:\n{\nname: "string",\ndetails: "string",\nprice: "string",\nproductImage: "base64"\n}\n\nMəhsulu silmək üçün endpoint - api/products/id\n\n\nAPI tədris məqsədi ilə istifadə olunmaq üçün yaradılıb.\nTərlan Əlicanov © 2023`
  )
);
