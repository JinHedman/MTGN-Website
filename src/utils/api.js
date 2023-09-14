// api.js
import client from './contentfulClient';

export const fetchBlogPosts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blandaren',
    });

    const posts = response.items.map((item) => {
      return {
        id: item.sys.id,
        title: item.fields.title,
        content: item.fields.content,
        author: item.fields.author,
        date: item.fields.date,
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const fetchPhotos = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'mpictures',
        
      });
  
      const photo = response.items.map((item) => {
        return {
          id: item.sys.id,
          picture: item.fields.mpicture,
          event: item.fields.event
        };
      });
  
      return photo;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  };
      
  export const fetchProfilePicture = async (username) => {
    try {
      const response = await client.getEntries({
        content_type: 'profilePicture',
        'fields.username': username ,
      });
  
      if (response.items.length === 0) {
        throw new Error(`No picture found for username: ${username}`);
      }
  
      const item = response.items[0];
      const picture = {
        id: item.sys.id,
        picture: item.fields.picture,
      };
  
      return picture;
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      return null;
    }
  };

  export const fetchAllUsers = async () => {
    try{
        const response = await client.getEntries({
            content_type: 'profilePicture'
        });

        const profile = response.items.map((item) => {
            return {
                id: item.sys.id,
                picture: item.fields.picture,
                username: item.fields.username

            };
          });
        return profile
} catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  };

  //Phösare profile fetch
  export const fetchAllPhos = async () => {
    try{
        const response = await client.getEntries({
            content_type: 'phosPictures'
        });

        const profile = response.items.map((item) => {
            return {
                id: item.sys.id,
                picture: item.fields.picture,
                username: item.fields.username

            };
          });
        return profile
} catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  };
      