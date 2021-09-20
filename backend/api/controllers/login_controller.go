package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"

	"github.com/vallezw/SheetUploader-Selfhosted/backend/api/auth"
	"github.com/vallezw/SheetUploader-Selfhosted/backend/api/models"
	"github.com/vallezw/SheetUploader-Selfhosted/backend/api/utils/formaterror"
	"golang.org/x/crypto/bcrypt"
)

func (server *Server) Login(c *gin.Context) {
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		c.String(http.StatusUnprocessableEntity, err.Error())
		return
	}

	user.Prepare()
	err = user.Validate("login")
	if err != nil {
		c.String(http.StatusUnprocessableEntity, err.Error())
		return
	}
	token, err := server.SignIn(user.Email, user.Password)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		c.String(http.StatusUnprocessableEntity, formattedError.Error())
		return
	}
	c.JSON(http.StatusOK, token)
}

func (server *Server) SignIn(email, password string) (string, error) {

	var err error

	user := models.User{}

	err = server.DB.Model(models.User{}).Where("email = ?", email).Take(&user).Error
	if err != nil {
		return "", err
	}
	err = models.VerifyPassword(user.Password, password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}
	return auth.CreateToken(user.ID, server.Config.ApiSecret)
}
