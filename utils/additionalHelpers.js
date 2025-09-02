//pagination

function applyHelper(model, queryParams) {
  const { page = 1, limit = 6, sort, fields, q, ...rest } = queryParams;

  const filters = {};
  for (const [k, v] of Object.entries(queryParams)) {
    const m = k.match(/^(\w+)\[(gte|gt|lte|lt|ne|in)\]$/);
    if (m) {
      const [, field, op] = m;
      filters[field] = filters[field] || {};
      filters[field]['$' + op] = op === 'in' ? String(v).split(',') : Number(v);
    } else if (!['page','limit','sort','fields','q'].includes(k)) {
      filters[k] = v;
    }
  }

  let query = model.find(filters);
  if (q) query = query.find({ $text: { $search: String(q) } });
  if (sort) query = query.sort(String(sort).split(',').join(' '));
  else query = query.sort('-createdAt');
  if (fields) query = query.select(String(fields).split(',').join(' '));

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  query = query.skip((pageNum - 1) * limitNum).limit(limitNum);

  return { query, page: pageNum, limit: limitNum, filters };
}

module.exports = { applyHelper};