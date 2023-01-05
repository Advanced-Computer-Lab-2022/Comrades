# Comrades Online Learning Platform

Implementation of a fully functional online learning platform through the use of MERN stack!

## Badges

![alt text](https://camo.githubusercontent.com/c839570bc71901106b11b8411d9277a6a8356a9431e4a16d6c26db82caab7d62/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465)
![alt text](https://camo.githubusercontent.com/8286a45a106e1a3c07489f83a38159981d888518a740b59c807ffc1b7b1e2f7b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f657870726573732e6a732d2532333430346435392e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d253233363144414642)
![alt text](https://camo.githubusercontent.com/268ac512e333b69600eb9773a8f80b7a251f4d6149642a50a551d4798183d621/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642)
![alt text](https://camo.githubusercontent.com/7d7b100e379663ee40a20989e6c61737e6396c1dafc3a7c6d2ada8d4447eb0e4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)
![alt text](https://camo.githubusercontent.com/4590c0af4aeb1b75233885f86e80c1da8cb2afd401173a40e41370f5cad5db20/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d4a534f4e253230776562253230746f6b656e73)
![alt text](https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465)


## Motivation :muscle:

The project was built as a capstone for "Advanced Computer Lab" Course at the GUC.
The idea was to offer Intersting and helpfull courses to any body who want to develop his skills.
You can Easily watch your lessons, solve exercises and reieve your certificate after finishing your course without any need to schools or colleges.  

## Build status :gear:	

The Code is in Perfect Status as we invested a lot of time in erros solving and explainning our functions and concepts which makes
 it too easy for other developers to edit 
 the code and reshape it in the way they are willing too.

The project needs more development in the direction of becoming mobile-friendly.


## Code Style :closed_book:
![MongoDB](https://img.shields.io/badge/camelCase-Convention-brightgreen)
- The architecture for the features is MVC (Model View Controller) [Learn More Here](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

- We used camelCase for variables.

- Codes are formatted in VS Code using alt + shift + F.

- Indentation was used to assist in identifying control flow and blocks of code.

- Curley braces are used except for the case where the body of the loop/conditional statement is a single code.

- Spaces are not used rather than tabs.


## Screenshots :camera:	

![Alt AllCourses](https://github.com/Advanced-Computer-Lab-2022/Comrades/blob/main/allcourses.PNG)
![Alt Home](https://github.com/Advanced-Computer-Lab-2022/Comrades/blob/main/homepage.PNG)



## Tech Stack :computer:	

*Client:* React, Bootstrap & Material UI

*Server:* Node, Express, MongoDB


## Features :page_with_curl:	

- Simple in colors.
- The information are easily stated on the page for better user experience.
  
## Code Examples :floppy_disk:	

Below is an example of how to login using on our platform.

### Frontend:
#### React Component Code:
```
<Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} value={username} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
    </Form.Group>
    <Button onClick={handleShow} variant="link" style={{ marginLeft: "-10px" }}>
        Forgot your password?
    </Button>
    <Button disabled={isLoading} variant="dark" type="submit">
        Login
    </Button>
    <Button href="/" variant="danger" style={{ marginLeft: "10px", borderRadius: "0px" }}>
        Cancel
    </Button>
    {error && <div className="error">{error}</div>}
</Form>
```

#### handleSubmit Method:
```
const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username.toLowerCase(), password)
}
```

#### useLogin Hook login Method
```
const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }
```


### Backend:
#### User Model Method
```
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ Username: username })
    if (!user) {
        throw Error('Incorrect username')
    }
    const match = await bcrypt.compare(password, user.Password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}
```



## Installation :electric_plug:	

### Clone the repo using:
```
gh repo clone Advanced-Computer-Lab-2022/Comrades
```

### Make sure NPM is installed:
```
npm install -g npm
```

### Make sure Node.JS is installed, you can get it through this [link](https://nodejs.org/en/download/).

### Install the required packages for frontend and backend as mentioned before in the installation section.

#### Install required packages for frontend:
```
  cd front_end
  npm install
```
#### Install required packages for backend:
```
  cd back_end
  npm install my-project
``` 
#### Create a .env file in the backend:
It should be placed at same directory level with server.JS and should include the following:
```
PORT=4000
MONGO_URI=''
SECRET=whateveryoulike
```
- PORT can be anything but make sure its working.
- MONGO_URI can be found through the connection Tab at MongoDB, use this link for more information: [link](https://www.geeksforgeeks.org/how-to-connect-node-js-to-a-mongodb-database/#:~:text=To%20connect%20a%20Node.,use%20a%20library%20called%20Mongoose.&text=method%20of%20Mongoose-,mongoose.,%3A%20true%2C%20useUnifiedTopology%3A%20true%20%7D).
- SECRET can be whatever you prefer.

### Finally to run the program:
Make sure you have 2 terminals open, one for the front and one for the back.
#### To run the frontend:
```
cd front_end
npm start
```
#### To run the backend:
Please note that npm run_dev only for development mode.
```
cd back_end
npm run dev
```

## API Reference :books:	

Please visit the following link for the full API references documentation(Preferably don't use a mobile although its supported):
[Comrades API Documentation](https://omarshokeir.github.io/comrades-docs/)











## Tests :pencil2:	

Below is an example on how to test a GET request:
```
describe("GET getCoursesInstructor/:query", () => {
    test("Get courses of instructor by ID", (done) => {
      request(app)
        .get("/api/users/getCoursesInstructor/63a21cbdd7dcdba272cadbb6")
        .expect(200)
        .expect((res) => {
          res.body.Username = "testingituser";
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
```

## How to use? :clapper:	




## Contributing :handshake:	

Contributions are always welcomed, make sure to reach out for us by email: omarshokeir2@gmail.com


## Credits :moneybag:	

 - [Net Ninja MERN Stack Course](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
 - [Net Ninja Auth Course](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)



## License :balance_scale:	

[MIT](https://choosealicense.com/licenses/mit/)


    
