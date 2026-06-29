const userForm = (req, res) => {
    res.write(`<form action="/sibmite" method="post">

        <input type="text" placeholder="enter name" name="name" />
        <input type="email" placeholder="enter email" name="email" />
        <button>submite</button>
    </form>`)
}

module.exports = userForm;