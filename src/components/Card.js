import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__trash ${isOwn ? 'elements__trash' : 'elements__trash_hidden'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_active' : ''}`;

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__element">
            <img
                className="elements__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick(card)}
            />
            <button
                type="button"
                className={cardDeleteButtonClassName}
                aria-label="Корзина"
                onClick={handleDeleteClick}
            >

            </button>
            <div className="elements__body">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-group">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Нравится"
                        onClick={handleLikeClick}
                    >

                    </button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;