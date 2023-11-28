import User from "../model/user.js";

export const saveHistory = async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        
        user.history = [...user.history, ...req.body.body.map(obj => ({ content: obj.content, summary: obj.summary }))]
        
        await user.save();
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

export const getHistory = async (req,res) => {
    
    const email = req.query.email
    try{
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
        const arr = user.history.filter((entry) => entry.content);
        return res.status(200).json({ history: arr })
  
    }
    catch(error){
        return res.status(500).json({ error: error.message})
    }

}

