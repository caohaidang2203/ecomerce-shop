import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const { event, isLoading } = useSelector((state) => state.event);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {/* <EventCard active={true} data={event && event[0]} />
          <EventCard active={true} data={event && event[1]} /> */}
          {event.length === 1 && (
            <EventCard active={true} data={event && event[0]} />
          )}
          {event.length >= 2 && (
            <EventCard active={true} data={event && event[0]} />
          )}
          {event.length >= 2 && (
            <EventCard active={true} data={event && event[1]} />
          )}
          <h4>{event?.length === 0 && "No Events have!"}</h4>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
