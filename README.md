# Project Title

Comarades is a online Learning Website where you can subscribe to many Intresting Courses and learn so much under Supervision of the Best Instructors. 


## Authors

- [@Omar Wael]
- [@Mohammed Saad]
- [@Abdelrahman Koussy]
- [@Yehia Tawfik]
- [@Youssef Ibrahim]


## Motivation

The project was built as a capstone for "Advanced Computer Lab" Course at the GUC.
The idea was to offer Intersting and helpfull courses to any body who want to develop his skills.
You can Easily watch your lessons, solve exercises and reieve your certificate after finishing your course without any need to schools or colleges.  

## Build status

The Code is in Perfect Status as we invested a lot of time in erros solving and explainning our functions and concepts which makes
 it too easy for other developers to edit 
 the code and reshape it in the way they are willing too.

The project needs more development in the direction of becoming mobile-friendly.


## Code Style
We used camelCase for variables.

Codes are formatted in VS Code using alt + shift + F.

Indentation was used to assist in identifying control flow and blocks of code.

Curley braces are used except for the case where the body of the loop/conditional statement is a single code.

Spaces are not used rather than tabs.


## Screenshots

![Alt AllCourses](https://github.com/Advanced-Computer-Lab-2022/Comrades/blob/main/allcourses.PNG)
![Alt Home](https://github.com/Advanced-Computer-Lab-2022/Comrades/blob/main/homepage.PNG)



## Tech Stack

*Client:* React, Bootstrap & Material UI

*Server:* Node, Express, MongoDB


## Features

- Simple in colors.
- The information are easily stated on the page for better user experience.
  
## Code Examples

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



## Installation

Install required packages for frontend:
```
  cd front_end
  npm install
```
Install required packages for backend:
```
  cd back_end
  npm install my-project
```

# API Reference



## Course


#### Get Courses
http
  GET /api/courses/getCourses


| Parameter | Type     | Description         |
| :-------- | :------- | :------------------ |
| `       ` |  `array` |Return all Courses   |

#### Filter by Price

http
  GET /api/course/filterCoursesByPrice


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Price`   | `array`  | all course that cost equal to or less than price |

#### Filter by Subject and Rating

http
  GET /api/courses/filterCoursesBySubjectAndRating


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Subject And Rating`   | `array`  | all course that has same subject and Rating |


#### Get all Instructor Courses

http
  GET /api/courses/getCoursesInstructor


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor`| `array`  | return Instructor courses |


#### Get Instructor Courses based on Subject

http
  GET /api/courses/filterCoursesBySubjectInstructor


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `subject` | `array`  | return same subject instructor courses |

#### Get specefic course

http
  GET /api/courses/getCourseById


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `course`    | return one specefic course |


#### Get specefic course

http
  GET /api/courses/getCourseByName


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`    | return one specefic course |

## User 

#### change password 


http
  GET /api/users/recieveEmailToChangePassword


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`    | `string`    | change password |

#### get a specefic instructor 


http
  GET /api/users/getInstructorByID


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number`    | get instructor |

#### Rate instructor

http
  GET /api/users/rateInstructor


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `rate`      | `number`    | rate instructor |



#### change email

http
  GET /api/users/changeEmail


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string`    | change email |


#### change biography

http
  GET /api/users/changeBio

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bio`     | `string`    | change biograpghy |



## Problems Controller


#### get all Problems

http
  GET /api/problem/getAllProblems

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` problem   `| `array`    | get all problems |

#### update Problem Status

http
  Post /api/problem/updateProblemStatus

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problem `| `array`    | updat problems |


#### create Test Problem

http
  Post /api/problem/createTestProblem
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problem `| `array`    | Create Test Problem |




## Course Request

#### Get all Requests
http
  Get /api/courseRequests/getAllRequests
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `         `| `  `    | Get All Requests |


#### Update  Request
http
  Post /api/courseRequests/updateRequestStatus
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` Request `| `string`|update Request |


#### Create Request
http
  Post /api/courseRequests/createCourseRequest
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` Request `| `string`|Create Requests |











## Tests

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

# How to use?

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
npm run_dev
```


## Contributing

Contributions are not welcomed.


## Credits

 - [Net Ninja MERN Stack Course](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
 - [Net Ninja Auth Course](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)



## License

[MIT](https://choosealicense.com/licenses/mit/)


    
