const fs = require('fs');

module.exports = {
    addTeamPage: (req,res) => {
        res.render('add-team.ejs', {
            title: "Welcome to Socka | Add a Team",
            message: "Add new Team"
        });
    },
    addTeam: (req,res) => {
        let team_name = req.body.team_name;
        let country = req.body.country;
        let coach = req.body.coach;


        let teamnameQuery = "SELECT * FROM `team` WHERE team_name = '" + team_name + "'";

        db.query(teamnameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Team already exists';
                res.render('add-team.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new team"
                });
            } else {
                let query = "INSERT INTO `team` (team_name, country, coach) VALUES ('" +
                    team_name + "', '" + country + "', '" + coach + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    }
}