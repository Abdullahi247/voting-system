const Contestant = require("../Models/Contestants");
const Participant = require("../Models/Participants");
const Voters = require("../Models/Voters");
const jwt = require('jsonwebtoken')
const { customAlphabet } = require('nanoid')
const UniqueIDs = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 15)
const UniqueIDDs = customAlphabet('1234567890', 6)
const axios = require('axios')
const { Token } = require("../Models/accountToken");



const president = 'PSD', VicePresident = "VPSD", GS = "GS", AGS = "AGS", PS = "PS", Treasurer = "TR", FS = "FS", SS = "SS", ExOM = "EXOM", LA = "LA"

async function LoginUsers(req, res) {
    console.log(process.env.TWILIO_ACCOUNT_SID)
    console.log(req.body)
    const { username } = req.body
    Participant.findOne({ phone: username }, (err, participant) => {
        if (participant) {

            const uId = UniqueIDDs()
            Token.findOneAndUpdate({ contact: username }, { token: uId }, (err, data) => {
                if (data) {
                    axios.post('https://jde62k.api.infobip.com/sms/2/text/advanced', {
                        "messages": [
                            {
                                "destinations": [
                                    {
                                        "to": username
                                    }
                                ],
                                "from": "Voting System",
                                "text": `This is your secured OTP to vote use: ${uId}`
                            }
                        ]
                    }
                        , {
                            headers: {
                                'Authorization': process.env.SMS,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }
                    )
                        .then((res) => {
                            res.status(200).send({ statusMessage: 'Successful' })
                        })
                        .catch((err) => {
                            res.status(200).send({ statusMessage: 'Successful' })
                        })
                } else {
                    const new_Token = new Token({
                        token: uId,
                        contact: username
                    })
                    new_Token.save()
                        .then(() => {
                            axios.post('https://jde62k.api.infobip.com/sms/2/text/advanced', {
                                "messages": [
                                    {
                                        "destinations": [
                                            {
                                                "to": username
                                            }
                                        ],
                                        "from": "Voting System",
                                        "text": `This is your secured OTP to vote use: ${uId}`
                                    }
                                ]
                            }
                                , {
                                    headers: {
                                        'Authorization': process.env.SMS,
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    }
                                }
                            )
                                .then((res) => {
                                    res.status(200).send({ statusMessage: 'Successful' })
                                })
                                .catch((err) => {
                                    res.status(200).send({ statusMessage: 'Successful' })
                                })
                        })
                        .catch((err) => {
                            res.status(400).send({ statusMessage: 'failed' })
                        })
                }
            })
        }
        else {
            res.status(400).send({ statusMessage: 'This user does not exist' })
        }
    })

}

async function AdminLogin(req, res) {

}

async function AuthenticationChecker(req, res) {
    const authHeader = req.get('Authorization')
    console.log(authHeader)
    if (authHeader) {
        const Token = authHeader.split(' ')[1]
        jwt.verify(Token, process.env.MYJWTSECRET, (err, decoded) => {
            if (decoded) {
                return res.status(200).send({ message: 'successful' })
            }
            else {
                return res.status(440).send({ message: 'Unauthorised access' })
            }

        })
    }
    else {
        res.status(440).send({ message: 'Unauthorised access' })
    }
}

async function AllVotes(req, res) {
    console.log("fqqwweer")
    Voters.find({}, (err, votes) => {
        if (votes && votes.length > 0) {
            res.status(200).send({ statusMessage: { President: "", VicePresident: "", GS: "", AGS: "", PS: "", Treasurer: "", FS: "", SS: "", ExOM: "", LA: "" } })
        }
        else {
            res.status(400).send({ statusMessage: "" })
        }
    })
}

async function AddNewCandidate(req, res) {
    console.log(req.body)
    const { firstName,
        lastName,
        contact,
        email,
        position,
        imageURL } = req.body
    if (position === "President") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: president
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Vice-President") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: VicePresident
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "General Secretary") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: GS
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Assistant General Secretary") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: AGS
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Publicity Secretary") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: PS
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Treasurer") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: Treasurer
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Financial Secretary") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: FS
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Social Secretary") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: SS
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Ex-Officio Members") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: ExOM
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else if (position === "Legal Adviser") {
        const new_Contestant = new Contestant({
            name: position,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            position: position,
            imageLink: imageURL,
            contestantId: UniqueIDs(),
            generalContestantId: LA
        })
        new_Contestant.save()
            .then((result) => {
                res.status(200).send({ statusMessage: '' })
                return
            })
            .catch((err) => {
                res.status(400).send({ statusMessage: '' })
                return
            })
    }
    else {
        res.status(400).send({ statusMessage: 'failed' })
    }
}

async function CheckMontitorPerVote(req, res) {
    const { position, generalContestantId } = req.body
    console.log(req.body)
    console.log("req.body")
    if (position === "President") {
        Contestant.find({ generalContestantId: president }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: president }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Vice-President") {
        Contestant.find({ generalContestantId: VicePresident }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: VicePresident }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "General Secretary") {
        Contestant.find({ generalContestantId: GS }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: GS }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Assistant General Secretary") {
        Contestant.find({ generalContestantId: AGS }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: AGS }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Publicity Secretary") {
        Contestant.find({ generalContestantId: PS }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: PS }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Treasurer") {
        Contestant.find({ generalContestantId: Treasurer }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: Treasurer }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Financial Secretary") {
        Contestant.find({ generalContestantId: FS }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: FS }, (err, contestantIds) => {
                    if (contestantIds) {
                        // console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                // console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    // console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Social Secretary") {
        Contestant.find({ generalContestantId: SS }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: SS }, (err, contestantIds) => {
                    if (contestantIds) {
                        // console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                // console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    // console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Ex-Officio Members") {
        Contestant.find({ generalContestantId: ExOM }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: ExOM }, (err, contestantIds) => {
                    if (contestantIds) {
                        console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else if (position === "Legal Adviser") {
        Contestant.find({ generalContestantId: LA }, (err, contestant) => {
            if (contestant) {
                Voters.find({ generalContestantId: LA }, (err, contestantIds) => {
                    if (contestantIds) {
                        // console.log(contestant.length)
                        function SortVote(contestant, contestantIds) {
                            var stats = []
                            for (let i = 0; i < contestant.length; i++) {
                                // /    console.log(contestantIds)
                                var all = 0
                                const g = contestantIds.map((x) => {
                                    console.log(x.contestantId == contestant[i].contestantId)
                                    if (x.contestantId == contestant[i].contestantId) {
                                        all++
                                        return all
                                    }
                                    else {
                                        return all
                                    }
                                    // find(o => o.contestantId === contestant[i].contestantId)
                                });
                                const fullName = contestant[i].firstName + " " + contestant[i].lastName
                                stats.push({ fullName: fullName, counts: all, imageLink: contestant[i].imageLink })
                                // console.log(obj)
                            }
                            return stats
                        }
                        const x = SortVote(contestant, contestantIds)
                        res.status(200).send({ statusMessage: x })
                    }
                    else {
                        res.status(400).send({ statusMessage: "" })
                    }
                })

            }
            else {
                res.status(400).send({ statusMessage: "" })
            }
        })
    }
    else {
        res.status(400).send({ statusMessage: 'failed' })
    }
}
async function PollPositionPerVote(req, res) {
    const { position } = req.body
    // console.log(req.body)
    Contestant.find({ position: position }, (err, contestant) => {
        if (contestant) {
            Voters.find({ contestantId: position }, (err, contestantIds) => {
                if (contestantIds) {
                    // console.log(contestant.length)
                    function SortVote(contestant, contestantIds) {
                        var stats = []
                        for (let i = 0; i < contestant.length; i++) {
                            console.log(contestantIds)
                            var all = 0
                            const g = contestantIds.map((x) => {
                                // console.log(x.contestantId == contestant[i].contestantId)
                                if (x.contestantId == contestant[i].contestantId) {
                                    all++
                                    return all
                                }
                                else {
                                    return all
                                }
                                // find(o => o.contestantId === contestant[i].contestantId)
                            });
                            const fullName = contestant[i].firstName + " " + contestant[i].lastName
                            stats.push({ fullName: fullName, position: contestant[i].position, contestantId: contestant[i].contestantId, imageLink: contestant[i].imageLink, generalContestantId: contestant[i].generalContestantId })
                            // console.log(obj)
                        }
                        return stats
                    }
                    const x = SortVote(contestant, contestantIds)
                    res.status(200).send({ statusMessage: x })
                }
                else {
                    res.status(400).send({ statusMessage: "" })
                }
            })

        }
        else {
            res.status(400).send({ statusMessage: "" })
        }
    })
}

async function VoterSelection(req, res) {
    console.log(req.body)
    const { position, generalContestantId } = req.body
    const authHeader = req.get('Authorization')
    // console.log(authHeader)
    if (authHeader) {
        const Token = authHeader.split(' ')[1]
        jwt.verify(Token, process.env.MYJWTSECRET, (err, decoded) => {
            if (decoded) {

                const votersContact = decoded.username
                console.log(votersContact)
                Voters.findOne({ phone: votersContact, generalContestantId: generalContestantId }, (err, voter) => {
                    if (voter) {
                        res.status(201).send({ statusMessage: "Vote allready Casted successfully" })
                    }
                    else {
                        Participant.findOne({ phone: votersContact }, (err, data) => {
                            if (data) {
                                Contestant.findOne({}, (err, user) => {
                                    if (user) {

                                    } else {

                                    }
                                })
                                const new_Voters = new Voters({
                                    phone: data.phone,
                                    contestantId: position,
                                    generalContestantId: generalPositionId

                                })
                                new_Voters.save()
                                    .then(() => {
                                        res.status(200).send({ statusMessage: "Vote Casted successful" })
                                    })
                                    .catch(() => {
                                        res.status(400).send({ statusMessage: "Vote Casted failed" })
                                    })
                            }
                            else {
                                res.status(400).send({ statusMessage: "Vote Casted failed" })
                            }
                        })
                    }
                })
            }
            else {
                return res.status(440).send({ message: 'Unauthorised access' })
            }

        })
    }
    else {
        return res.status(440).send({ message: 'Unauthorised access' })

    }
}

async function ValidateOTP(req, res) {
    const { username, otp } = req.body
    console.log(req.body)
    console.log(username.slice(-6))
    Participant.findOne({ phone: username }, (err, participant) => {
        if (participant) {
            Token.findOne({ token: otp }, (err, user) => {
                if (user) {
                    const payload = { username }
                    const token = jwt.sign(payload, process.env.MYJWTSECRET, { expiresIn: '24h' })
                    res.status(200).send({ statusMessage: token })
                }
                else {
                    res.status(400).send({ statusMessage: 'This user does not exist' })
                }
            })
        }
        else {
            res.status(400).send({ statusMessage: 'This user does not exist' })
        }
    })
}
module.exports = { LoginUsers, AdminLogin, AuthenticationChecker, AllVotes, AddNewCandidate, CheckMontitorPerVote, VoterSelection, PollPositionPerVote, ValidateOTP }