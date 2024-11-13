enum BookGenre {
    FICTION = "Fiction",
    NON_FICTION = "Non-Fiction",
    MYSTERY = "Mystery",
    SCIENCE_FICTION = "Science Fiction",
    BIOGRAPHY = "Biography",
    FANTASY = "Fantasy",
    CLASSIC = "Classic" 
  }
  
  enum MemberRole {
    ORGANIZER = "Organizer",
    MODERATOR = "Moderator",
    MEMBER = "Member",
    GUEST = "Guest",
  }
  
  type Book = {
    title: string;
    author: string;
    genre: BookGenre;
  }
  
  type Member = {
    name: string;
    role: MemberRole;
  }
  
  function getBooksByGenre(books: Book[], genre: BookGenre): Book[] {
    return books.filter(book => book.genre === genre);
  }
  
  function getMembersByRole(members: Member[], role: MemberRole): Member[] {
    return members.filter(member => member.role === role);
  }
  
  function countBooksByGenre(books: Book[]): Record<string, number> {
    const genreCount: Record<string, number> = {};
    books.forEach(book => {
      genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
    });
    return genreCount;
  }
  
  const books: Book[] = [
      { title: "ABCD", author: "EFGH", genre: BookGenre.FANTASY },
      { title: "IJK", author: "LMN", genre: BookGenre.FICTION }, 
      { title: "OPQ", author: "RST", genre: BookGenre.MYSTERY },
      { title: "XY", author: "Z", genre: BookGenre.NON_FICTION },
  ];
  
  const members: Member[] = [
    { name: "A", role: MemberRole.ORGANIZER },
    { name: "B", role: MemberRole.MEMBER },
    { name: "C", role: MemberRole.MEMBER },
    { name: "D", role: MemberRole.GUEST },
  ];
  
  console.log("Books in Fiction genre:", getBooksByGenre(books, BookGenre.FICTION));
  console.log("Members with role 'Member':", getMembersByRole(members, MemberRole.MEMBER));
  console.log("Count of books by genre:", countBooksByGenre(books));
  