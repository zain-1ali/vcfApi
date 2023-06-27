const VCard = require('vcard-creator').default
const fs = require('fs')
const fetch = require('isomorphic-fetch');

const convertVcf = async (req, res) => {
    let { userdata,sociallink ,img } = req.body
    

   
    try {

        async function imageUrlToBase64(url) {
            try {
              const response = await fetch(url);
          
              const blob = await response.arrayBuffer();
          
              const contentType = response.headers.get('content-type');
          
              const base64String = `data:${contentType};base64,${Buffer.from(
                blob,
              ).toString('base64')}`;
          
              return base64String;
            } catch (err) {
              console.log(err);
            }
          }
          
          const base64String = await imageUrlToBase64(img).then((url)=>{
            // console.log(url)
          }).catch((err)=>{
            console.log(err)
          });
        // const base64 = fs.readFileSync(base64String, { encoding: 'base64', flag: 'r' })
        
    // Define a new vCard

    const myVCard = new VCard();

    // Some variables
    const lastname = userdata?.name;
    const firstname = "";
    const additional = "";
    const prefix = "";
    const suffix = "";

    myVCard
      .addName(lastname, firstname, additional, prefix, suffix)
      .addJobtitle(userdata?.job)
      .addEmail(userdata?.email)
      .addPhoneNumber(userdata?.phone)
      .addAddress('', '', '', userdata?.address, '', '', '')
      .addPhoto(base64String, 'png')
    sociallink?.map((link) => {
      myVCard.addSocial(link?.value,link?.name,link?.name);
    });



  // Convert the vCard to a string
  const vcardString = myVCard.toString();

  // Send the vCard as a response
  res.set('Content-Disposition', 'attachment; filename="contact.vcf"');
  res.set('Content-Type', 'text/vcard');
  res.send(vcardString);


    } catch (error) {
        console.log(error)
        res
            .status(error)
            .json({ success: false, message: error.response })
    }
}

module.exports = convertVcf 