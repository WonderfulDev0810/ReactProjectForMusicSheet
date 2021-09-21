package forms

type GetSheetsPageRequest struct {
	SortBy string `form:"sort_by,default=updated_at desc"`
	Limit int `form:"limit,default=10"`
	Page int `form:"page,default=1"`
	Composer string `form:"composer"`
}
