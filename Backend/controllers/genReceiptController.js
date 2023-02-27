import Mailgen from 'mailgen';
import fs from 'fs'


export const genReceipt = ( name, Address, city, postalCode,country, user ) => {
    // Configure mailgen by setting a theme and your product info
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'hubSandy Collection',
            link: 'https://hubsandy.com/',
            // Optional logo
            logo: 'https://asset.cloudinary.com/dn41vnrn0/1de1c8c202564cea4b86ff9e432405fc',
            logoHeight: '50px'
        }
    });

    // Prepare email contents
    const email = {
        body: {
            name: user,
            intro: 'Your order has been processed successfully.',
            table: {
                data: name.map((item) => {
                    return {
                        Item: item.name,
                        Price: item.price,
                        Address: Address,
                        City: city,
                        Postal: postalCode,
                        Country: country 
                    }}),
                columns: {
                    // Optionally, customize the column widths
                    customWidth: {
                        Item: '300px',
                        Price:"50px",
                        Address:"350px",
                        City:"100px",
                        Postal:"100px",
                        Country:"100px",
                    },
                    // Optionally, change column text alignment
                    customAlignment: {
                        Country: 'right'
                    }
                }
            },
            action: {
                instructions: 'You can check the status of your order and more in your dashboard:',
                button: {
                    color: '#3869D4',
                    text: 'Go to Dashboard',
                    link: 'https://sandyhub.com'
                }
            },
            outro: 'We thank you for your patronage!'
        }
    };


    // Generate an HTML email with the provided contents
    const emailBody = mailGenerator.generate(email);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailText = mailGenerator.generatePlaintext(email);

    // Optionally, preview the generated HTML e-mail by writing it to a local file
    fs.writeFileSync('preview.html', emailBody, 'utf8');
    fs.writeFileSync('preview.txt', emailText, 'utf8');

    return { emailText, emailBody}
}