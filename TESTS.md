<details>
  <summary>Getting courses of an instructor</summary>
  
  ```
  describe("GET getCoursesInstructor/:query", () => {
      test("Get courses of instructor by ID", (done) => {
        request(app)
          .get("/api/users/getCoursesInstructor/63a21cbdd7dcdba272cadbb6")
          .expect(200)
          .expect((res) => {
            res.body[0].Username = "testingituser";
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });
  ```  
  
</details>

<details>
  <summary>Getting an instructor by ID</summary>
  
    ```
    describe("GET getInstructorByID/:query", () => {
        test("Get an instructor by ID", (done) => {
          request(app)
            .get("/api/users/getInstructorByID/63a21cbdd7dcdba272cadbb6")
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

  
</details>

<details>
  <summary>Rating an instructor</summary>
  
    ```
    describe('POST /rateInstructor', () => {
  test('it should rate the instructor and return the updated user object', async () => {
    const res = await request(app).post('/API/Users/rateInstructor').send({
      name: 'testInstructor',
      Rating: 5,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Username', 'testInstructor');
    expect(res.body).toHaveProperty('Rating', 5);
  });
});
    ```
  
</details>

<details>
  <summary>Receiving an email to change password</summary>
  
describe('POST /recieveEmailToChangePassword', () => {
  test('it should send an email to the specified address', async () => {
    const res = await request(app).post('/API/Users/recieveEmailToChangePassword').send({
      Email: 'test@example.com',
      Password: 'newPw',
    });
    expect(res.statusCode).toBe(200);
  });
});


  
</details>

<details>
  <summary>Changing a password without Token</summary>
  
describe('POST /changePasswordNoToken', () => {
  test('it should change the password for the specified username and return the updated user object', async () => {
    const res = await request(app).post('/API/Users/changePasswordNoToken').send({
      Token: 'testUsername',
      Password: 'newPassword',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Username', 'testUsername');
    expect(res.body).toHaveProperty('Password', 'newPassword');
  });
});



  
</details>

<details>
  <summary>Changing password with a Token</summary>
  
describe('POST /changePassword', () => {
  test('it should change the password for the specified username and return the updated user object', async () => {
    const res = await request(app).post('/API/Users/changePassword').send({
      Token: 'testToken',
      Password: 'newPassword',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Password', 'newPassword');
  });
});
  
</details>

<details>
  <summary>Get ratings of an instructor</summary>
  
describe('GET /getRatingsInstructor', () => {
  test('it should return the user object for the specified instructor', async () => {
    const res = await request(app).get('/API/Users/getRatingsInstructor?name=testInstructor&Rating=5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Username', 'testInstructor');
    expect(res.body).toHaveProperty('Rating', 5);
  });
});
  
</details>

<details>
  <summary>Review Instructor</summary>
  
describe('POST /reviewInstructor', () => {
  test('it should post a review about the instructor and return the updated user object', async () => {
    const res = await request(app).post('/API/Users/reviewInstructor').send({
      Reviewer: 'testUser',
      Review: 'This instructor was great!',
      Instructor: 'testInstructor',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Username', 'testInstructor');
    expect(res.body).toHaveProperty('Reviews', ['This instructor was great!']);
  });
});
  
</details>

<details>
  <summary>Get reviews of an instructor</summary>
  
describe('GET /getReviewsInstructor', () => {
  test('it should return an array of reviews for the specified instructor', async () => {
    const res = await request(app).get('/API/Users/getReviewsInstructor?instructor=testInstructor');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(['This instructor was great!']);
  });
});
  
</details>

<details>
  <summary>Change an Email</summary>
  
describe('POST /changeEmail', () => {
  test('it should change the email for the specified user', async () => {
    const res = await request(app).post('/API/Users/changeEmail').send({
      User: 'testUser',
      Email: 'new@example.com',
    });
    expect(res.statusCode).toBe(200);
  });
});
  
</details>

<details>
  <summary>Changing a user's bio</summary>
  
describe('POST /changeBio', () => {
  test('it should change the bio for the specified user', async () => {
    const res = await request(app).post('/API/Users/changeBio').send({
      Username: 'testInstructor',
      Biography: 'I am an experienced instructor.',
    });
    expect(res.statusCode).toBe(200);
  });
});
  
</details>

<details>
  <summary>Email a certificate</summary>
  
describe('POST /emailCertificate', () => {
  test('it should send an email with a link to the user's certificate', async () => {
    const res = await request(app).post('/API/Users/emailCertificate').send({
      Username: 'testUser',
      CourseID: 'testCourse',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ done: 'done' });
  });
});
  
</details>

<details>
  <summary>Requesting a refund</summary>
  
describe('POST /requestRefund', () => {
  test('it should refund the specified course and return the updated user object', async () => {
    const res = await request(app).post('/API/Users/requestRefund').send({
      Username: 'testUser',
      CourseID: 'testCourse',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('done');
    expect(res.body.done).toHaveProperty('Username', 'testUser');
  });
});
  
</details>

<details>
  <summary>Marking a user as finished subtitle</summary>
  
describe('POST /userFinishSubtitle', () => {
  test('it should store data about the user finishing the specified subtitle and return the updated user object', async () => {
    const res = await request(app).post('/API/Users/userFinishSubtitle').send({
      Username: 'testUser',
      CourseID: 'testCourse',
      SubtitleID: 'testSubtitle',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('done');
    expect(res.body.done).toHaveProperty('Username', 'testUser');
  });
});
  
</details>

<details>
  <summary>Signing a user up for a course</summary>
  
describe('POST /addCourseToUser', () => {
  test('it should sign the user up for the specified course and return a success message', async () => {
    const res = await request(app).post('/API/Users/addCourseToUser').send({
      Username: 'testUser',
      CourseName: 'testCourse',
      NumSubtitles: 10,
      AmountPaid: 100,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ done: 'Done' });
  });
});
  
</details>

<details>
  <summary>Issue a refund for a user</summary>
  
describe('POST /issueRefund', () => {
  test('it should add money to the user's wallet and return a success message', async () => {
    const res = await request(app).post('/API/Users/issueRefund').send({
      Username: 'testUser',
      Amount: 50,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ done: 'Done' });
  });
});

</details>

<details>
  <summary>Admin creating a user</summary>
  
describe('POST /createUserByAdmin', () => {
  test('it should create a new user and return the user object', async () => {
    const res = await request(app).post('/API/Users/createUserByAdmin').send({
      Email: 'test@example.com',
      Username: 'testUser',
      Password: 'testPassword',
      UserType: 'Student',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Username', 'testUser');
    expect(res.body).toHaveProperty('Email', 'test@example.com');
    expect(res.body).toHaveProperty('Password', 'testPassword');
    expect(res.body).toHaveProperty('UserType', 'Student');
  });
});

</details>

<details>
  <summary>Signup a user</summary>
  
describe('POST /createUserByAdmin', () => {
  test('it should create a new user and return the user object', async () => {
    const res = await request(app).post('/API/Users/createUserByAdmin').send({
      Email: 'test@example.com',
      Username: 'testUser',
      Password: 'testPassword',
      UserType: 'Student',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Username', 'testUser');
    expect(res.body).toHaveProperty('Email', 'test@example.com');
    expect(res.body).toHaveProperty('Password', 'testPassword');
    expect(res.body).toHaveProperty('UserType', 'Student');
  });
});

</details>

<details>
  <summary>Rate a course</summary>
  
describe('POST /rateCourse', () => {
  test('it should rate the specified course and return the updated course object', async () => {
    const res = await request(app).post('/API/Courses/rateCourse').send({
      id: 'testCourse',
      Rating: 4,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 'testCourse');
    expect(res.body).toHaveProperty('Rating', 4);
  });
});

</details>

<details>
  <summary>Create a course</summary>
  
describe('POST /createCourse', () => {
  test('it should create a new course and return the course object', async () => {
    const res = await request(app).post('/API/Courses/createCourse').send({
      Preview: 'testPreview',
      Title: 'testTitle',
      Subject: 'testSubject',
      Subtitles: 10,
      Instructor: 'testInstructor',
      Price: 100,
      CreditHours: 5,
      Discount: 0,
      Description: 'This is a test course.',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Preview', 'testPreview');
    expect(res.body).toHaveProperty('Title', 'testTitle');
    expect(res.body).toHaveProperty('Subject', 'testSubject');
    expect(res.body).toHaveProperty('Subtitles', 10);
    expect(res.body).toHaveProperty('Instructor', 'testInstructor');
    expect(res.body).toHaveProperty('Price', 100);
    expect(res.body).toHaveProperty('CreditHours', 5);
    expect(res.body).toHaveProperty('Discount', 0);
    expect(res.body).toHaveProperty('Description', 'This is a test course.');
  });
});
  
</details>

<details>
  <summary>Get a currency</summary>
  
describe('GET /getCurrency', () => {
  test('it should return the rate for converting dollars to the specified currency', async () => {
    const res = await request(app).get('/API/Courses/getCurrency').query({
      country: 'US',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('code', 'USD');
    expect(res.body).toHaveProperty('rate');
  });
});
  
</details>

<details>
  <summary>Get all courses</summary>
  
describe('GET /getCourses', () => {
  test('it should return all courses', async () => {
    const res = await request(app).get('/API/Courses/getCourses');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
  
</details>

<details>
  <summary>Searching for a course</summary>
  
describe('POST /search', () => {
  test('it should search for courses based on the provided query and return the matching courses', async () => {
    const res = await request(app).post('/API/Courses/search').send({
      query: 'testTitle',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
  
</details>

<details>
  <summary>Get a course by ID</summary>
  
describe('GET /getCourseById', () => {
  test('it should return the course with the specified ID', async () => {
    const res = await request(app).get('/API/Courses/getCourseById').query({
      id: 'testCourse',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 'testCourse');
  });
});
  
</details>

<details>
  <summary>Get a course by Name</summary>
  
describe('GET /getCourseByName', () => {
  test('it should return the course with the specified name', async () => {
    const res = await request(app).get('/API/Courses/getCourseByName').query({
      id: 'testTitle',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Name', 'testTitle');
  });
});
  
</details>

<details>
  <summary>Get a subtitle by index and course ID</summary>
  
describe('GET /getSubtitleByIndexAndCourseID', () => {
  test('it should return the specified subtitle for the specified course', async () => {
    const res = await request(app).get('/API/Courses/getSubtitleByIndexAndCourseID').query({
      id: 'testCourse',
      index: 1,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('Index', 1);
  });
});
  
</details>

<details>
  <summary>Get reviews of a course by ID</summary>
  
describe('GET /getCourseReviewsById', () => {
  it('should return an array of course reviews for the specified course id', () => {
    // Make a GET request to the API with a course id
    const res = await request(app).get('/getCourseReviewsById?id=123');

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);

    // Assert that the response body is an array of course reviews
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 400 status code if no course id is provided', () => {
    // Make a GET request to the API without a course id
    const res = await request(app).get('/getCourseReviewsById');

    // Assert that the response status code is 400
    expect(res.statusCode).toBe(400);
  });
});
  
</details>

<details>
  <summary>Get a list of countries</summary>
  
describe('GET /getCountries', () => {
  it('should return an array of countries', () => {
    // Make a GET request to the API
    const res = await request(app).get('/getCountries');

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);

    // Assert that the response body is an array of countries
    expect(Array.isArray(res.body)).toBe(true);
  });
});
  
</details>

<details>
  <summary>Search as an instructor in your own courses</summary>
  
describe('GET /searchInstructor', () => {
  it('should return an array of courses matching the search criteria', () => {
    // Make a GET request to the API with instructor and search parameters
    const res = await request(app).get('/searchInstructor?Instructor=John&Search=Math');

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);

    // Assert that the response body is an array of courses
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 400 status code if no instructor or search criteria is provided', () => {
    // Make a GET request to the API without instructor and search parameters
    const res = await request(app).get('/searchInstructor');

    // Assert that the response status code is 400
    expect(res.statusCode).toBe(400);
  });
});
  
</details>

<details>
  <summary>Filter courses by subject as an instructor</summary>
  
describe('GET /filterCoursesBySubjectInstructor', () => {
  it('should return an array of courses matching the subject and instructor criteria', () => {
    // Make a GET request to the API with instructor and subject parameters
    const res = await request(app).get('/filterCoursesBySubjectInstructor?Instructor=John&Subject=Math');

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);

    // Assert that the response body is an array of courses
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 400 status code if no instructor or subject is provided', () => {
    // Make a GET request to the API without instructor and subject parameters
    const res = await request(app).get('/filterCoursesBySubjectInstructor');

    // Assert that the response status code is 400
    expect(res.statusCode).toBe(400);
  });
});  
</details>

<details>
  <summary>Filter courses by price as an instructor</summary>
  
describe('GET /filterCoursesByPriceInstructor', () => {
  it('should return an array of courses matching the price and instructor criteria', () => {
    // Make a GET request to the API with instructor and price parameters
    const res = await request(app).get('/filterCoursesByPriceInstructor?Instructor=John&Price=100');

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);

    // Assert that the response body is an array of courses
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 400 status code if no instructor or price is provided', () => {
    // Make a GET request to the API without instructor and price parameters
    const res = await request(app).get('/filterCoursesByPriceInstructor');

    // Assert that the response status code is 400
    expect(res.statusCode).toBe(400);
  });
});

  
</details>

<details>
  <summary>Filter courses by price as a user</summary>
  
describe('GET /filterCoursesByPrice', () => {
  it('should return an array of courses matching the price criteria', () => {
    // Make a GET request to the API with a price query parameter
    const res = await request(app).get('/filterCoursesByPrice?query=100');

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);

    // Assert that the response body is an array of courses
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 400 status code if no price query is provided', () => {
    // Make a GET request to the API without a price query parameter
    const res = await request(app).get('/filterCoursesByPrice');

    // Assert that the response status code is 400
    expect(res.statusCode).toBe(400);
  });
});

  
</details>
