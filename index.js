import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Southeast Asia",
    content:
      "Southeast Asia is home to some of the most breathtaking and underexplored destinations. From the ancient temples of Angkor Wat in Cambodia to the pristine beaches of the Philippines, there's so much to discover. This post takes you on a journey through the hidden gems of Southeast Asia, offering travel tips and insights on the best places to visit.",
    author: "Emily Johnson",
    date: "2023-07-15T09:00:00Z",
  },
  {
    id: 2,
    title: "The Art of Making Authentic Italian Pasta",
    content:
      "Italian cuisine is beloved worldwide, and nothing represents it better than pasta. But making authentic Italian pasta is an art. From selecting the right ingredients to mastering the perfect texture, this post dives deep into the traditional techniques that make Italian pasta so delicious.",
    author: "Marco Rossi",
    date: "2023-08-03T11:30:00Z",
  },
  {
    id: 3,
    title: "The Journey of a Rising Star in Singing",
    content:
      "The world of music is full of talented individuals, but it takes more than just talent to make it big. This post follows the journey of a rising star in the singing industry, exploring the challenges and triumphs along the way, and offering advice for aspiring singers.",
    author: "Alicia Moore",
    date: "2023-08-18T13:45:00Z",
  },
  {
    id: 4,
    title: "The Evolution of Cricket Tactics Over the Decades",
    content:
      "Cricket has seen a tremendous evolution in tactics and strategies over the years. From the traditional test matches to the fast-paced T20 format, this post explores how cricket tactics have changed, and what modern teams can learn from the past.",
    author: "Rahul Sharma",
    date: "2023-09-05T16:00:00Z",
  },
];

let lastId = 4;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req,res) => {
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req,res) => {
  const id = parseInt(req.params.id);
  const entry = posts.find( (post) => post.id === id);

  if(!entry) res.sendStatus(404).json({ message: "Post not found" });
  res.json(entry);
});

//CHALLENGE 3: POST a new post
app.post("/posts" ,(req,res) =>{
  const newPost = {
    id: lastId + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  };

  posts.push(newPost);
  lastId = lastId + 1;
  res.status(201).json(newPost);
});


//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id" , (req,res) => {
  const id = parseInt(req.params.id);

  const e = posts.find( (post) => post.id === id);
  if (!e) return res.status(404).json({ message: "Post not found" });
  if (req.body.title) e.title = req.body.title;
  if (req.body.content) e.content = req.body.content;
  if (req.body.author) e.author = req.body.author;

  res.json(e);
});


//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex( (joke) => joke.id === id);
  
  if(searchIndex > -1)
  {
    posts.splice(searchIndex,1);
    res.json({ message: "Post deleted" });
  }
  else
  {
    return res.status(404).json({ message: "Post not found" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
