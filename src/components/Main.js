import React from 'react';
import pen_avatar from '../images/pen_avatar.png';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";

function Main({
    cards,
    onCardClick,
    handleEditClick,
    handleAvatarClick,
    handleAddClick,
    onCardLike,
    onCardDelete,
    isCardsLoading,
    isCardsError
}) {
    const currentUser = React.useContext(CurrentUserContext);

    const pen = pen_avatar;

    return (
        <>
            <section className="profile">
                <img src={currentUser.avatar}
                    alt="Аватарка"
                    className="profile__image"
                />
                <div className="profile__mask-avatar"
                    onClick={handleAvatarClick}>
                    <img src={pen}
                        alt="Редактировать аватар"
                        className="profile__pen-avatar"
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__body">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            aria-label="Редактировать"
                            onClick={handleEditClick}
                        >

                        </button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    aria-label="Добавить"
                    onClick={handleAddClick}
                >

                </button>
            </section>
            <section className="cards">
                {isCardsLoading && (
                    <Spinner />
                )}
                {isCardsError && (
                    <p className='places__loading'>isCardsError</p>
                )}
                {!isCardsLoading && !isCardsError && (
                    <ul className="elements">
                        {cards.map((card) =>
                        (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                        )}
                    </ul>
                )}
            </section>
        </>
    );
}

export default Main;