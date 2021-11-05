import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const onCardClick = selectedCard => setSelectedCard(selectedCard);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [cardDelete, setCardDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const onEditAvatar = () => { setIsEditAvatarPopupOpen(true); };
  const onEditProfile = () => { setIsEditProfilePopupOpen(true); };
  const onAddPlace = () => { setIsAddPlacePopupOpen(true); };

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [isCardsLoadError, setIsCardsLoadError] = useState();

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
    setCardDelete(null);
  }

  useEffect(() => {
    setIsCardsLoading(true);
    api.getInitialCards().then(cards => {
      setCards(cards)
    }).catch(err => setIsCardsLoadError(err))
      .finally(() => setIsCardsLoading(false))
  }, [])

  useEffect(() => {
    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleCardDeleteAccept(card) {
    setCardDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id));
        setIsDeleteCardPopupOpen(false);
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(user) {
    api.changeAvatar(user.avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(user) {
    setIsUserLoading(true);
    api.editProfile(user.name, user.about)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => console.log(err))
      .finally(() => setIsUserLoading(false));
  }

  function handleAddPlaceSubmit(newCard) {
    setIsCardLoading(true);
    api.initialNewCard(newCard.name, newCard.link)
      .then((setNewCard) => {
        setCards((state) => [
          setNewCard,
          ...state,
        ]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(err => console.log(err))
      .finally(() => setIsCardLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='theme'>
        <div className='page'>
          <Header />
          <Main
            cards={cards}
            onCardClick={onCardClick}
            handleEditClick={onEditProfile}
            handleAddClick={onAddPlace}
            handleAvatarClick={onEditAvatar}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteAccept}
            isCardsLoading={isCardsLoading}
            isCardsError={isCardsLoadError} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isUserLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isLoading={isCardLoading} />
          <PopupWithForm
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            popupTitle="Вы уверены?"
            name="delete-card"
            btnText="Да"
            onSubmit={handleCardDelete} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;