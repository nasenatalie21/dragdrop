var mysql = require('mysql');
var http = require('http');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test1'
});


con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    
    var q_events_table = "CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), gallery VARCHAR(255), survey_score INT, attendees_num INT, respondents_num INT, event_code VARCHAR(6), frame VARCHAR(45),  presentor varchar(20), place varchar(20), time TIME, date DATE, poster VARCHAR(255), photo VARCHAR(255))";
    
    con.query(q_events_table, function(err, result){
        if (err) throw err;
        console.log("Events table ceated.");
    });
  
    var q_booths_table = "CREATE TABLE booths (id INT AUTO_INCREMENT PRIMARY KEY, booth_code VARCHAR(6) UNIQUE,booth_name VARCHAR(255), topic varchar(255), respondents_num INT, event_id INT, FOREIGN KEY (event_id) REFERENCES events(id))"; 
    
    con.query(q_booths_table, function(err, result){
        if (err) throw err;
        console.log("Booths table ceated.");
    });
  
    var q_users_table = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, role INT NOT NULL, booth_id INT, FOREIGN KEY (booth_id) REFERENCES booths(id), qr_code varchar(255))";
    con.query(q_users_table, function(err, result){
        if (err) throw err;
        console.log("Users table ceated.");
    });
    var q_attendance_table = "CREATE TABLE attendance (id INT AUTO_INCREMENT PRIMARY KEY, booths_id INT, FOREIGN KEY(booths_id) REFERENCES booths(id), visitor VARCHAR(255))"; 
    con.query(q_attendance_table, function(err, result){
        if (err) throw err;
        console.log("Booths Attendance table ceated.");
    });

    var q_galleries_table = "CREATE TABLE galleries (id INT AUTO_INCREMENT PRIMARY KEY, event_id INT, name VARCHAR(255), gallery_location VARCHAR(255), FOREIGN KEY(event_id) REFERENCES events(id))";
    con.query(q_galleries_table, function(err, result){
        if (err) throw err;
        console.log("Galleries table ceated.");
    });

    var q_photos_table = "CREATE TABLE photos (id INT AUTO_INCREMENT PRIMARY KEY, gallery_id INT, timestamp DATETIME, uploader INT, FOREIGN KEY (gallery_id) REFERENCES galleries(id), FOREIGN KEY (uploader) REFERENCES users(id))";
    con.query(q_photos_table, function(err, result){
        if (err) throw err;
        console.log("Photos table ceated.");
    });

    var q_series_table = "CREATE TABLE series (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), date_added DATETIME DEFAULT CURRENT_TIMESTAMP, date_modified DATETIME DEFAULT CURRENT_TIMESTAMP, description VARCHAR(255), creator INT, FOREIGN KEY (creator) REFERENCES users(id))";
    con.query(q_series_table, function(err, result){
        if (err) throw err;
        console.log("Series table ceated.");
    });
    var q_seasons_table = "CREATE TABLE seasons (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), date_added DATETIME DEFAULT CURRENT_TIMESTAMP, date_modified DATETIME DEFAULT CURRENT_TIMESTAMP, description VARCHAR(255), trailer VARCHAR(255), series_id INT, creator INT, FOREIGN KEY (series_id) REFERENCES series(id),  FOREIGN KEY (creator) REFERENCES users(id))";
    con.query(q_seasons_table, function(err, result){
        if (err) throw err;
        console.log("Series table ceated.");
    });

    var q_eps_table = "CREATE TABLE episodes(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), link VARCHAR(255), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, description VARCHAR(255),season_id INT, series_id INT, uploader INT, FOREIGN KEY (season_id) REFERENCES seasons(id), FOREIGN KEY (series_id) REFERENCES series(id), FOREIGN KEY (uploader) REFERENCES users(id))";
    con.query(q_eps_table, function(err, result){
        if (err) throw err;
        console.log("Episodese table ceated.");
    });

    var q_comments_table = "CREATE TABLE comments(id INT AUTO_INCREMENT PRIMARY KEY, episode_id INT, user_id INT, comment VARCHAR(255), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (episode_id) REFERENCES episodes(id), FOREIGN KEY (user_id) REFERENCES users(id))";
    con.query(q_comments_table, function(err, result){
        if (err) throw err;
        console.log("Comments table created.");
    });

    var q_survey_responses = "CREATE TABLE survey_responders(id INT AUTO_INCREMENT PRIMARY KEY, booth_respondent VARCHAR(255) NOT NULL UNIQUE )";
    con.query(q_survey_responses, function(err, ){
        if (err) throw err;
        console.log("responders table created.");
    });
    var q_survey_responses = "CREATE TABLE esurvey_responders(id INT AUTO_INCREMENT PRIMARY KEY, event_respondent VARCHAR(255) NOT NULL UNIQUE )";
    con.query(q_survey_responses, function(err, result){
        if (err) throw err;
        console.log("responders table created.");
    });

    var q_booth_questions_table = "CREATE TABLE booth_survey (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255) NOT NULL)"; 

    con.query(q_booth_questions_table, function(err, result){
        if (err) throw err;
        console.log("booth_survey table ceated.");
    });
    var q_questions_table = "CREATE TABLE event_survey (id INT AUTO_INCREMENT PRIMARY KEY, question VARCHAR(255) NOT NULL)"; 

    con.query(q_questions_table, function(err, result){
        if (err) throw err;
        console.log("event_survey table ceated.");
    });

    var q_votes_table = "CREATE TABLE booth_votes(user_id INT, booth_id INT, comment VARCHAR(255), FOREIGN KEY(booth_id) REFERENCES booths(id), FOREIGN KEY(user_id) REFERENCES users(id))"
    con.query(q_votes_table, function(err, result){
        if(err) throw err;
        console.log("votes table created.")
    });

    /*
    INSERT INTO users 
    (id, email, role)
    VALUES
    ("dummy.account@dummy.com", 4);



    INSERT INTO series
    (title, description, )
    VALUES 
    ("nicole.f.galapate@accenture.com", 1);



*/

});



http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var txt = "Hello World!";
    res.end(txt);
}).listen(8080);



//return;