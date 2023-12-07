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
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(1) DEFAULT '1'::character varying NOT NULL,
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    type character varying NOT NULL
);


ALTER TABLE public.permission OWNER TO postgres;

--
-- Name: COLUMN permission.create_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.permission.create_at IS '创建时间';


--
-- Name: COLUMN permission.update_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.permission.update_at IS '更新时间';


--
-- Name: COLUMN permission.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.permission.status IS '状态';


--
-- Name: COLUMN permission.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.permission.id IS '权限ID';


--
-- Name: COLUMN permission.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.permission.name IS '权限名称';


--
-- Name: COLUMN permission.type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.permission.type IS '权限类型';


--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_id_seq OWNER TO postgres;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(1) DEFAULT '1'::character varying NOT NULL,
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: COLUMN role.create_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.create_at IS '创建时间';


--
-- Name: COLUMN role.update_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.update_at IS '更新时间';


--
-- Name: COLUMN role.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.status IS '状态';


--
-- Name: COLUMN role.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.id IS '角色ID';


--
-- Name: COLUMN role.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.name IS '角色名称';


--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    password character varying NOT NULL,
    email character varying,
    name character varying NOT NULL,
    name_cn character varying NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    tel character varying(20),
    status character varying(1) DEFAULT '1'::character varying NOT NULL,
    mobile character varying(20)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: COLUMN "user".id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".id IS '用户UID';


--
-- Name: COLUMN "user".password; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".password IS '密码';


--
-- Name: COLUMN "user".email; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".email IS '邮箱';


--
-- Name: COLUMN "user".name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".name IS '用户码';


--
-- Name: COLUMN "user".name_cn; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".name_cn IS '用户名';


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
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(1) DEFAULT '1'::character varying NOT NULL,
    rid integer NOT NULL,
    uid integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- Name: COLUMN user_role.create_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.user_role.create_at IS '创建时间';


--
-- Name: COLUMN user_role.update_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.user_role.update_at IS '更新时间';


--
-- Name: COLUMN user_role.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.user_role.status IS '状态';


--
-- Name: COLUMN user_role.rid; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.user_role.rid IS '角色关联RID';


--
-- Name: COLUMN user_role.uid; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.user_role.uid IS '用户关联UID';


--
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_role_id_seq OWNER TO postgres;

--
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_role_id_seq OWNED BY public.user_role.id;


--
-- Name: user_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_uid_seq
    START WITH 1001
    INCREMENT BY 1
    MINVALUE 1000
    NO MAXVALUE
    CACHE 1
);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: user_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission (create_at, update_at, status, id, name, description, type) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (create_at, update_at, status, id, name) FROM stdin;
2023-10-31 15:16:04.518278	2023-10-31 15:16:04.518278	1	1	超级管理员
2023-10-31 15:16:10.960595	2023-10-31 15:16:10.960595	1	2	管理员
2023-10-31 15:16:17.927481	2023-10-31 15:16:17.927481	1	3	普通用户
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, password, email, name, name_cn, create_at, update_at, tel, status, mobile) FROM stdin;
1006	d8MMuOMkgQ6Tk/cPr4QA/Lsh135fnaJc8jb7gvd3sRebPm1nnjhcuP80re7mQ08jK//PejAdcaZK1qg2nI52U+C8++O0GLL+Y5r1wO7HIwfO3WsECIk2UA1Jk/4JMFqtgT1zOCz6dFXfYlHqpnA5IKRKrxN36iG9Mk2ZGaaRF/DxrxVFmKfJyOfN8ld4HIim554c0Hh/id/j/M7gFXuy9wi3OLcqJ6+8srwPyeMdYyXAFfS92lPWNhA7xniHFC7+0VZDW4GhoOdBwVkbjiwwBWkFNjaEQOYvo4aSvG0ozaHkjjG/wu1GUxNqPMABWI/Bi/Lo/emIuHq2k9y777HM8w==	\N	13212341234	13212341234	2023-11-23 09:30:48.100096	2023-11-23 09:30:48.100096	\N	1	13212341234
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (create_at, update_at, status, rid, uid, id) FROM stdin;
2023-11-23 09:30:48.135842	2023-11-23 09:30:48.135842	1	3	1006	5
\.


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 3, true);


--
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_role_id_seq', 5, true);


--
-- Name: user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_uid_seq', 1006, true);


--
-- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: user_role PK_fb2e442d14add3cefbdf33c4561; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role FK_1a71176de53d9ead7dcb99624b4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "FK_1a71176de53d9ead7dcb99624b4" FOREIGN KEY (uid) REFERENCES public."user"(id);


--
-- Name: user_role FK_ba38982c25f601e55631fad6dad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "FK_ba38982c25f601e55631fad6dad" FOREIGN KEY (rid) REFERENCES public.role(id);


--
-- PostgreSQL database dump complete
--

