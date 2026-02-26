
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const WINDOWID: string;
	export const __ETC_PROFILE_DONE: string;
	export const npm_config_userconfig: string;
	export const __HM_SESS_VARS_SOURCED: string;
	export const COLORTERM: string;
	export const HYPRLAND_CMD: string;
	export const XDG_CONFIG_DIRS: string;
	export const npm_config_cache: string;
	export const hardeningDisable: string;
	export const ZELLIJ_SESSION_NAME: string;
	export const XDG_SESSION_PATH: string;
	export const NIX_BUILD_CORES: string;
	export const NIX_GCROOT: string;
	export const configureFlags: string;
	export const XDG_BACKEND: string;
	export const mesonFlags: string;
	export const FORGIT_INSTALL_DIR: string;
	export const shell: string;
	export const depsHostHost: string;
	export const NODE: string;
	export const LC_ADDRESS: string;
	export const LC_NAME: string;
	export const SSH_AUTH_SOCK: string;
	export const XDG_DATA_HOME: string;
	export const STRINGS: string;
	export const DRI_PRIME: string;
	export const depsTargetTarget: string;
	export const AGENT: string;
	export const XCURSOR_PATH: string;
	export const stdenv: string;
	export const COLOR: string;
	export const OPENAI_API_KEY: string;
	export const LOCALE_ARCHIVE_2_27: string;
	export const npm_config_local_prefix: string;
	export const builder: string;
	export const GNUPGHOME: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const shellHook: string;
	export const NO_AT_BRIDGE: string;
	export const npm_config_globalconfig: string;
	export const XCURSOR_SIZE: string;
	export const GPG_TTY: string;
	export const EDITOR: string;
	export const phases: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const SOURCE_DATE_EPOCH: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const ZELLIJ_PANE_ID: string;
	export const XDG_SESSION_TYPE: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const NIX_PATH: string;
	export const npm_config_init_module: string;
	export const IN_NIX_RUN: string;
	export const NIXPKGS_CONFIG: string;
	export const CXX: string;
	export const _: string;
	export const TEMPDIR: string;
	export const system: string;
	export const HOST_PATH: string;
	export const TERMINAL: string;
	export const QT_STYLE_OVERRIDE: string;
	export const GTK2_RC_FILES: string;
	export const IN_NIX_SHELL: string;
	export const doInstallCheck: string;
	export const HOME: string;
	export const NIX_BINTOOLS: string;
	export const OPENCODE: string;
	export const SSH_ASKPASS: string;
	export const LANG: string;
	export const LC_PAPER: string;
	export const NIXOS_OZONE_WL: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const depsTargetTargetPropagated: string;
	export const NH_FLAKE: string;
	export const npm_package_version: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const cmakeFlags: string;
	export const STARSHIP_CONFIG: string;
	export const GIO_EXTRA_MODULES: string;
	export const outputs: string;
	export const NIX_STORE: string;
	export const TMPDIR: string;
	export const XDG_SEAT_PATH: string;
	export const LD: string;
	export const buildPhase: string;
	export const INIT_CWD: string;
	export const READELF: string;
	export const GTK_A11Y: string;
	export const STARSHIP_SESSION_KEY: string;
	export const QT_QPA_PLATFORM: string;
	export const FORGIT: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const ALACRITTY_SOCKET: string;
	export const INFOPATH: string;
	export const npm_lifecycle_script: string;
	export const doCheck: string;
	export const ANY_NIX_SHELL_PKGS: string;
	export const npm_config_npm_version: string;
	export const depsBuildBuild: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const GTK_PATH: string;
	export const SIZE: string;
	export const propagatedNativeBuildInputs: string;
	export const npm_config_prefix: string;
	export const CODESTRAL_API_KEY: string;
	export const USER: string;
	export const strictDeps: string;
	export const TZDIR: string;
	export const AR: string;
	export const AS: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const TEMP: string;
	export const ZELLIJ_AUTO_ATTACH: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const DISPLAY: string;
	export const MISTRAL_API_KEY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const NIX_BUILD_TOP: string;
	export const NM: string;
	export const PAGER: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const LC_TELEPHONE: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const patches: string;
	export const LC_MEASUREMENT: string;
	export const __NIXOS_SET_ENVIRONMENT_DONE: string;
	export const XDG_VTNR: string;
	export const buildInputs: string;
	export const XDG_SESSION_ID: string;
	export const preferLocalBuild: string;
	export const LOCALE_ARCHIVE: string;
	export const LESSKEYIN_SYSTEM: string;
	export const npm_config_user_agent: string;
	export const QML2_IMPORT_PATH: string;
	export const TERMINFO_DIRS: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const depsBuildTarget: string;
	export const OBJCOPY: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const out: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const STRIP: string;
	export const XCURSOR_THEME: string;
	export const XDG_DATA_DIRS: string;
	export const GDK_BACKEND: string;
	export const LIBEXEC_PATH: string;
	export const TMP: string;
	export const OBJDUMP: string;
	export const npm_config_noproxy: string;
	export const BROWSER: string;
	export const PATH: string;
	export const propagatedBuildInputs: string;
	export const npm_config_node_gyp: string;
	export const dontAddDisableDepTrack: string;
	export const ALACRITTY_LOG: string;
	export const CC: string;
	export const NIX_CC: string;
	export const ZELLIJ: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const depsBuildTargetPropagated: string;
	export const depsBuildBuildPropagated: string;
	export const npm_config_global_prefix: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const QT_PLUGIN_PATH: string;
	export const ZELLIJ_AUTO_EXIT: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const CONFIG_SHELL: string;
	export const __structuredAttrs: string;
	export const npm_node_execpath: string;
	export const RANLIB: string;
	export const NIX_HARDENING_ENABLE: string;
	export const LC_NUMERIC: string;
	export const OLDPWD: string;
	export const NIX_LDFLAGS: string;
	export const nativeBuildInputs: string;
	export const name: string;
	export const depsHostHostPropagated: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		WINDOWID: string;
		__ETC_PROFILE_DONE: string;
		npm_config_userconfig: string;
		__HM_SESS_VARS_SOURCED: string;
		COLORTERM: string;
		HYPRLAND_CMD: string;
		XDG_CONFIG_DIRS: string;
		npm_config_cache: string;
		hardeningDisable: string;
		ZELLIJ_SESSION_NAME: string;
		XDG_SESSION_PATH: string;
		NIX_BUILD_CORES: string;
		NIX_GCROOT: string;
		configureFlags: string;
		XDG_BACKEND: string;
		mesonFlags: string;
		FORGIT_INSTALL_DIR: string;
		shell: string;
		depsHostHost: string;
		NODE: string;
		LC_ADDRESS: string;
		LC_NAME: string;
		SSH_AUTH_SOCK: string;
		XDG_DATA_HOME: string;
		STRINGS: string;
		DRI_PRIME: string;
		depsTargetTarget: string;
		AGENT: string;
		XCURSOR_PATH: string;
		stdenv: string;
		COLOR: string;
		OPENAI_API_KEY: string;
		LOCALE_ARCHIVE_2_27: string;
		npm_config_local_prefix: string;
		builder: string;
		GNUPGHOME: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		shellHook: string;
		NO_AT_BRIDGE: string;
		npm_config_globalconfig: string;
		XCURSOR_SIZE: string;
		GPG_TTY: string;
		EDITOR: string;
		phases: string;
		XDG_SEAT: string;
		PWD: string;
		NIX_PROFILES: string;
		SOURCE_DATE_EPOCH: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		QT_QPA_PLATFORMTHEME: string;
		ZELLIJ_PANE_ID: string;
		XDG_SESSION_TYPE: string;
		NIX_ENFORCE_NO_NATIVE: string;
		NIX_PATH: string;
		npm_config_init_module: string;
		IN_NIX_RUN: string;
		NIXPKGS_CONFIG: string;
		CXX: string;
		_: string;
		TEMPDIR: string;
		system: string;
		HOST_PATH: string;
		TERMINAL: string;
		QT_STYLE_OVERRIDE: string;
		GTK2_RC_FILES: string;
		IN_NIX_SHELL: string;
		doInstallCheck: string;
		HOME: string;
		NIX_BINTOOLS: string;
		OPENCODE: string;
		SSH_ASKPASS: string;
		LANG: string;
		LC_PAPER: string;
		NIXOS_OZONE_WL: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		depsTargetTargetPropagated: string;
		NH_FLAKE: string;
		npm_package_version: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		cmakeFlags: string;
		STARSHIP_CONFIG: string;
		GIO_EXTRA_MODULES: string;
		outputs: string;
		NIX_STORE: string;
		TMPDIR: string;
		XDG_SEAT_PATH: string;
		LD: string;
		buildPhase: string;
		INIT_CWD: string;
		READELF: string;
		GTK_A11Y: string;
		STARSHIP_SESSION_KEY: string;
		QT_QPA_PLATFORM: string;
		FORGIT: string;
		NIX_USER_PROFILE_DIR: string;
		ALACRITTY_SOCKET: string;
		INFOPATH: string;
		npm_lifecycle_script: string;
		doCheck: string;
		ANY_NIX_SHELL_PKGS: string;
		npm_config_npm_version: string;
		depsBuildBuild: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		GTK_PATH: string;
		SIZE: string;
		propagatedNativeBuildInputs: string;
		npm_config_prefix: string;
		CODESTRAL_API_KEY: string;
		USER: string;
		strictDeps: string;
		TZDIR: string;
		AR: string;
		AS: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		TEMP: string;
		ZELLIJ_AUTO_ATTACH: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		DISPLAY: string;
		MISTRAL_API_KEY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		MOZ_ENABLE_WAYLAND: string;
		NIX_BUILD_TOP: string;
		NM: string;
		PAGER: string;
		NIX_CFLAGS_COMPILE: string;
		LC_TELEPHONE: string;
		QTWEBKIT_PLUGIN_PATH: string;
		patches: string;
		LC_MEASUREMENT: string;
		__NIXOS_SET_ENVIRONMENT_DONE: string;
		XDG_VTNR: string;
		buildInputs: string;
		XDG_SESSION_ID: string;
		preferLocalBuild: string;
		LOCALE_ARCHIVE: string;
		LESSKEYIN_SYSTEM: string;
		npm_config_user_agent: string;
		QML2_IMPORT_PATH: string;
		TERMINFO_DIRS: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		XDG_RUNTIME_DIR: string;
		depsBuildTarget: string;
		OBJCOPY: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		out: string;
		npm_package_json: string;
		LC_TIME: string;
		STRIP: string;
		XCURSOR_THEME: string;
		XDG_DATA_DIRS: string;
		GDK_BACKEND: string;
		LIBEXEC_PATH: string;
		TMP: string;
		OBJDUMP: string;
		npm_config_noproxy: string;
		BROWSER: string;
		PATH: string;
		propagatedBuildInputs: string;
		npm_config_node_gyp: string;
		dontAddDisableDepTrack: string;
		ALACRITTY_LOG: string;
		CC: string;
		NIX_CC: string;
		ZELLIJ: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		depsBuildTargetPropagated: string;
		depsBuildBuildPropagated: string;
		npm_config_global_prefix: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		QT_PLUGIN_PATH: string;
		ZELLIJ_AUTO_EXIT: string;
		ALACRITTY_WINDOW_ID: string;
		CONFIG_SHELL: string;
		__structuredAttrs: string;
		npm_node_execpath: string;
		RANLIB: string;
		NIX_HARDENING_ENABLE: string;
		LC_NUMERIC: string;
		OLDPWD: string;
		NIX_LDFLAGS: string;
		nativeBuildInputs: string;
		name: string;
		depsHostHostPropagated: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
