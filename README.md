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

Install my-project with npm

bash
  cd Front_end
  npm Install
  npm start


bash
  cd Back_End
  npm Install
  npm run dev

    
