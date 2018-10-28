
const getCustomer = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  })
}

const getTopMovies = () => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(['movie1', 'movie2']);
    }, 4000);
  })
}

const sendEmail = (email, movies) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 4000);

    })
  }

async function notifyCustomer() {
  try {
  const customer = await getCustomer(1);
    const movies = await getTopMovies();
    console.log('Top movies: ', movies);
    await sendEmail(customer.email, movies);
    console.log('Email sent...');
  }catch (err) {
     console.log(err);
  }
  
}

notifyCustomer()

