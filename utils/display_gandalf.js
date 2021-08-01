import fs from 'fs';
import stream from 'stream';

const displayGandalf = (req, res) => {
    const r = fs.createReadStream('./assets/img/gandalf.gif'); // or any other way to get a readable stream
    console.log(r);
    const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err); // No such file or any other kind of error
                return res.sendStatus(400);
            }
        });
    ps.pipe(res); // <---- this makes a trick with stream error handling
};

export default displayGandalf;