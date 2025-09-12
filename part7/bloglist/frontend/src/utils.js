export const blogSort = (blogs) => {
  return blogs.sort((a,b) => b.likes - a.likes)
};