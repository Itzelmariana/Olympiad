const db = require('../config/connection');
const { Profile } = require('../models');
const profileSeeds = require('./profileSeeds.json');
// const questionsSeeds = require('./questionsSeeds.json');
// const { Profile, Questions } = require('../models');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);

    //TO DO ADD LOGIC OF QUESTIONS FOR GAME
    // THE FOLLOWING IS JUST AN EXAMPLE TO POPULATE THOUGHT PER USER
    /*  await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    } */

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
