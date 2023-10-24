--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    uid integer NOT NULL,
    password character varying NOT NULL,
    email character varying,
    uname character varying NOT NULL,
    uname_cn character varying NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    tel character varying(20),
    status character varying(1) NOT NULL,
    mobile character varying(20) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: COLUMN "user".uid; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".uid IS '用户UID';


--
-- Name: COLUMN "user".password; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".password IS '密码';


--
-- Name: COLUMN "user".email; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".email IS '邮箱';


--
-- Name: COLUMN "user".uname; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".uname IS '用户码';


--
-- Name: COLUMN "user".uname_cn; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".uname_cn IS '用户名';


--
-- Name: COLUMN "user".create_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".create_at IS '创建时间';


--
-- Name: COLUMN "user".update_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".update_at IS '更新时间';


--
-- Name: COLUMN "user".tel; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".tel IS '电话';


--
-- Name: COLUMN "user".status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".status IS '状态';


--
-- Name: COLUMN "user".mobile; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".mobile IS '手机号';


--
-- Name: user_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN uid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_uid_seq
    START WITH 1001
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (uid, password, email, uname, uname_cn, create_at, update_at, tel, status, mobile) FROM stdin;
1003	aya	aya@qq.com	aya	Aya	2023-10-24 02:51:49.688275	2023-10-24 02:51:49.688275	\N	1	13212345678
\.


--
-- Name: user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_uid_seq', 1003, true);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (uid);


--
-- PostgreSQL database dump complete
--

