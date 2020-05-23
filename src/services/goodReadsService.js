
const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:godReadsService');

const parser = new xml2js.Parser({ explicitArray: false });

const goodReadService = () => {
  const getBookById = async (bookId) => {
    try {
      const { data } = await axios
        .get('https://www.goodreads.com/book/show/656.xml?key=N4VgUsTKmRoKLh9KYE2s3A');
      const { GoodreadsResponse: result } = await parser.parseStringPromise(data);
      return result.book;
    } catch (error) {
      debug(error);
    }
  };

  return {
    getBookById,
  };
};

module.exports = goodReadService();
