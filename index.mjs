// Import modules
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { User, Product } from './models/models.mjs';
import authenticateToken from './middleware/auth_mid.mjs';

// Alias JWT
const jwt = jsonwebtoken;

// Instantiate app object
const app = express();

// Enable middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/register', async (req, res) => {

    const { username, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ username, password: hashPass });
        res.status(201).json({ message: 'User Registered', user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Client/User login route

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log('User not found!');
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Supporting unencrypted passwords
        const passwordMatch = await bcrypt.compare(password, user.password) || (password === user.password);

        if (passwordMatch) {
            // Token with 'client' role set
            const token = jwt.sign({ username: user.username, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Token stored in cookie
            res.cookie('jwt', token, { httpOnly: true, secure: true, path: '/api', sameSite: 'lax' });
            res.status(201).json({ message: 'Login Successful' });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error:', error });
    }
});


// Admin login route

app.post('/adminlogin', async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log('User not found!');
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Supporting unencrypted passwords
        const passwordMatch = await bcrypt.compare(password, user.password) || (password === user.password);

        if (passwordMatch) {
            // Token with 'admin' role set
            const token = jwt.sign({ username: user.username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Token stored in cookie
            res.cookie('jwt', token, { httpOnly: true, secure: true, path: '/api', sameSite: 'lax' });
            res.status(201).json({ message: 'Login Successful' });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error:', error });
    }
});

// GET for Admins & Clients using auth middleware
app.get('/products', authenticateToken(['admin', 'client']), async (req, res) => {
    try {
        const prods = await Product.findAll();
        return res.status(200).json(prods);
    } catch (error) {
        console.error(error);
    }
});

app.get('/see', async (req, res) => {
    try {
        const prods = await User.findAll();
        return res.status(200).json(prods);
    } catch (error) {
        console.error(error);
    }
});

// Admin specific routes using auth middleware (POST, PUT, DELETE)
app.post("/api/addProducts", authenticateToken(['admin']), async (req, res) => {

    const { name, price } = req.body;

    try {
        const prods = await Product.create({ name, price });
        return res.status(201).json({ message: 'Product added', prods });
    } catch (error) {
        console.error('Insertion error:', error);
        return res.status(500).json({ message: 'Error adding product', error });
    }

});

app.put("/api/chngProduct/:id", authenticateToken(['admin']), async (req, res) => {

    const id = req.params.id;
    const { name, price } = req.body;

    try {
        const [rowsAffected] = await Product.update(
            { name, price },
            { where: { id: id } }
        );

        if (rowsAffected > 0) {
            // Product updated successfully
            const updatedProduct = await Product.findByPk(id); // Fetch the updated product
            res.status(200).json({ message: "Product changed successfully.", product: updatedProduct });
        } else {
            // Product not found or not updated
            res.status(404).json({ message: "Product not found or not updated." });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Error changing product', error });
    }
});

app.delete("/api/delProduct/:id", authenticateToken(['admin']), async (req, res) => {

    const qid = req.params.id;

    try {
        await Product.destroy({ where: { id: qid } });
        res.status(201).json({ message: "Product deleted sucessfully." });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Error deleting product', error });
    }

});

// Listen on PORT environment variable
const port = process.env.PORT;
app.listen(port, () => { console.log(`Server up on port ${port}...`) });