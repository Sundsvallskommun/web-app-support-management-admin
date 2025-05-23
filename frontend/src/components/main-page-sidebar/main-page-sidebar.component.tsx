import { Button, Divider, Link, Logo, Header, Combobox , Avatar, Image, MenuVertical, useSnackbar, Tooltip } from '@sk-web-gui/react';
import LucideIcon from '@sk-web-gui/lucide-icon';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useUserStore } from '@services/user-service/user-service';
import { shallow } from 'zustand/shallow';
import { useRouter } from 'next/router';
import { DialogCreateNamespace } from '@components/dialogs/dialog_create_namespace';
import { DialogModifyNamespace } from '@components/dialogs/dialog_modify_namespace';
import { MainPageLabelsContent } from '@components/main-page-contents/main-page-labels.component';
import { MainPageCategoriesContent } from '@components/main-page-contents/main-page-categories.component';
import { MainPageContactreasonsContent } from '@components/main-page-contents/main-page-contactreasons.component';
import { MainPageRolesContent } from '@components/main-page-contents/main-page-roles.component';
import { MainPageStatusesContent } from '@components/main-page-contents/main-page-statuses.component';
import { MainPageEmailConfigurationContent } from '@components/main-page-contents/main-page-emailconfiguration.component';
import { getMunicipalities } from '@services/supportmanagement-service/supportmanagement-municipality-service';
import { getNamespaces } from '@services/supportmanagement-service/supportmanagement-namespace-service';
import { v4 } from 'uuid';

export const MainPageSidebar: React.FC = () => {
  const user = useUserStore((s) => s.user, shallow);
  const router = useRouter();
  const snackBar = useSnackbar();
  const { t } = useTranslation();
  const [municipalities, setMunicipalities] = useState([]);
  const [namespaces, setNamespaces] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedNamespace, setSelectedNamespace] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState<boolean>(false);
  const { pathname, asPath, query } = router;  
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [hover, setHover] = useState<boolean[]>([false]);
  const menuItems = [
    {id: 1, displayName: t('common:submenu.categories')},
    {id: 2, displayName: t('common:submenu.labels')},
    {id: 3, displayName: t('common:submenu.contactreasons')},
    {id: 4, displayName: t('common:submenu.roles')},
    {id: 5, displayName: t('common:submenu.errandstatuses')},
    {id: 6, displayName: t('common:submenu.emailconfiguration')},
  ];

  const handleSelectedMunicipalityId: React.ComponentProps<typeof Combobox.Input>['onChange'] = e => {
    if (e?.target?.value) {
      setSelectedMunicipality(municipalities.find(m => m.name === e.target.value));
    }
  };
  
  const handleSelectedNamespace: React.ComponentProps<typeof Combobox.Input>['onChange'] = e => {
    if (e?.target?.value) {
      setSelectedNamespace(namespaces.find(m => m.displayName === e.target.value));
    }
  };

  const openCreateDialogHandler = () => {
    setIsCreateDialogOpen(true);
  };

  const openModifyDialogHandler = () => {
    setIsModifyDialogOpen(true);
  };

  const closeCreateDialogHandler = (confirm: boolean, reloadDropdown: boolean) => {
    if (reloadDropdown) {
      reloadNamespaceDropdown();
    }
    setIsCreateDialogOpen(false);
  };
  
  const closeModifyDialogHandler = () => {
    setIsModifyDialogOpen(false);
    reloadNamespaceDropdown();
  }

  const handleLanguageChange = (langValue: string) => {
    router.push({ pathname, query }, asPath, { locale: langValue });
  };
  
  const handleSelectedSubMenu = (menuIndex: number) => {
    setSelectedSubMenu(menuIndex);
    return false;
  };

  const reloadNamespaceDropdown = () => {
    setSelectedSubMenu(null);
    setSelectedNamespace(null);
    if (selectedMunicipality) {
      getNamespaces(selectedMunicipality.municipalityId)
        .then((res) => setNamespaces(res))
        .catch((e) => {
          handleError('Error when loading namespaces:', e, t('common:errors.errorLoadingNamespaces'));
      });
    }
  };
  
  const showSection = (param: number) => {
    switch (param) {
      case 1:
        return <MainPageCategoriesContent
          municipality={selectedMunicipality}
          namespace={selectedNamespace}
        />
      case 2:
        return <MainPageLabelsContent
          municipality={selectedMunicipality}
          namespace={selectedNamespace}
        />
      case 3:
        return <MainPageContactreasonsContent
          municipality={selectedMunicipality}
          namespace={selectedNamespace}
        />
      case 4:
        return <MainPageRolesContent
          municipality={selectedMunicipality}
          namespace={selectedNamespace}
        />
      case 5:
        return <MainPageStatusesContent
          municipality={selectedMunicipality}
          namespace={selectedNamespace}
        />
      case 6:
        return <MainPageEmailConfigurationContent
          municipality={selectedMunicipality}
          namespace={selectedNamespace}
        />
      default:
        return null;
    }
  };
  
  const handleError = (errorDescription: string, e: Error, message: string) => {
    console.error(errorDescription, e);
    snackBar({
      message: message,
      status: 'error',
      position: 'top',
      closeable: false
    });
  };

  const handleHover = (index: number) => {
    const newHover = [...hover];
    newHover[index] = true;
    setHover(newHover);
  };
  
  const resetHover = () => {
    setHover([false]);
  };
  
  useEffect(() => {
    getMunicipalities()
      .then((res) => setMunicipalities(res))
      .catch((e) => {
        handleError('Error when loading municipalities:', e, t('common:errors.errorLoadingMunicipalities'));
    });
  }, []);

  useEffect(() => {
    reloadNamespaceDropdown();
  }, [selectedMunicipality]);

  useEffect(() => {
    setSelectedSubMenu(null);
  }, [selectedNamespace]);

  return (
  <>
    <DialogCreateNamespace
      open={isCreateDialogOpen}
      municipality={selectedMunicipality}
      onClose={closeCreateDialogHandler}/>  

    <DialogModifyNamespace
      key={v4()}
      open={isModifyDialogOpen}
      municipality={selectedMunicipality}
      namespace={selectedNamespace}
      onClose={closeModifyDialogHandler}/>  

    <aside
      data-cy="overview-aside"
      className="flex-none z-10 bg-vattjom-background-200 h-full min-h-screen max-w-full w-full sm:w-[32rem] sm:min-w-[32rem] rounded"
    >
      <div className="h-full w-full p-24">
        <NextLink
          href="/"
          className="no-underline"
          aria-label={t('common:title')}
        >
          <Logo
            variant="service"
            title={t('common:title')}
            subtitle={t('common:subtitle')}
          />
        </NextLink>
        <div className="shadow">
          <div/>
        </div>
        <div className="py-24 h-fit flex gap-12 items-center justify-between">
          <div className="flex gap-12 justify-between items-center">
            {selectedNamespace && 
            <>
              <Avatar
                onMouseEnter={(e) => handleHover(0)}
                onMouseLeave={(e) => resetHover()}
                data-cy="avatar-aside"
                className="flex-none upper-case"
                size="md"
                initials={`${selectedNamespace.shortCode}`}
                color="vattjom"
              />
              <span className="leading-tight h-fit font-bold mb-0" data-cy="domaininfo">
                {selectedNamespace.displayName}
              </span>
                <Button
                  variant={'link'}
                  color={'vattjom'}
                  onClick={() => openModifyDialogHandler()}
                >
                 <LucideIcon name={'folder-pen'} size={18} color="vattjom"/>
              </Button>
              <Tooltip className={`${hover[0] ? 'namespace' : 'hidden'}`}>
                {selectedNamespace.namespace}
              </Tooltip>
            </>
            }
          </div>
        </div>
        {selectedNamespace && 
          <Divider />
        }
        <div className="flex flex-col gap-4">
          {selectedMunicipality && selectedNamespace && 
          <MenuVertical.Provider current={selectedSubMenu} setCurrent={handleSelectedSubMenu}>
            <MenuVertical.Sidebar>
              <MenuVertical>
                {menuItems.map(item => <MenuVertical.Item 
                  key={`mi-${item.id}`}
                  menuIndex={item.id} 
                >
                  <Link onClick={() => handleSelectedSubMenu(item.id)}>
                    <MenuVertical.ToolItem>
                      <span>{item.displayName}</span>
                    </MenuVertical.ToolItem>
                  </Link>
                </MenuVertical.Item>)}
              </MenuVertical>
            </MenuVertical.Sidebar>      
          </MenuVertical.Provider>}
        </div>
      </div>
    </aside>
    
    <div className="main-menu">
      <Header
        data-cy="nav-header"
      >
        <table>
          <tbody>
            <tr>
              <td>
                <Combobox>
                  <Combobox.Input
                    placeholder={t('common:mainmenu.select-municipality')}
                    searchPlaceholder={t('common:mainmenu.search-placeholder')}
                    multiple={false}
                    onChange={(e) => handleSelectedMunicipalityId(e)}
                  />
                  <Combobox.List>
                  
                    {municipalities.map(item => <Combobox.Option key={`cb-municipality-${item.municipalityId.toString()}`} value={item.municipalityId.toString()}>
                      {item.name}
                    </Combobox.Option>)}
                  </Combobox.List>
                </Combobox>

                <Combobox className="left-padded-10">
                  <Combobox.Input
                    key={v4()}
                    disabled={selectedMunicipality === null}
                    placeholder={t('common:mainmenu.select-namespace')}
                    searchPlaceholder={t('common:mainmenu.search-placeholder')}
                    multiple={false}
                    value={selectedNamespace?.namespace || ''}
                    onChange={(e) => handleSelectedNamespace(e)}
                  />
                  <Combobox.List>
                    {namespaces.map((item) => <Combobox.Option key={`co-namespace-${item.namespace}`} value={item.namespace}>
                      {item.displayName}
                    </Combobox.Option>)}
                  </Combobox.List>
                </Combobox>
                <div className={'left-padded-10'}>
                  <Button
                    leftIcon={<LucideIcon name={'square-plus'} />} 
                    key={'button-create-namespace'}
                    disabled={selectedMunicipality === null}
                    color={'vattjom'}
                    onClick={() => openCreateDialogHandler()}
                  >
                    {t('common:mainmenu.new-namespace')}
                  </Button>
                </div>

              </td>
              <td>
                <div>
                  <Button.Group>
                    <Button iconButton onClick={() => handleLanguageChange('sv')}>
                      <Image
                        alt="{t('common:mainmenu.swedish')}"
                        htmlHeight="42"
                        htmlWidth="26"
                        src={'/png/se.png'}
                      />
                    </Button>

                    <Button iconButton onClick={() => handleLanguageChange('en')}>
                      <Image
                        alt="{t('common:mainmenu.english')}"
                        htmlHeight="42"
                        htmlWidth="26"
                        src={'/png/en.png'}
                      />
                    </Button>

                    {user.name ?
                      <Button>
                        <NextLink href={'/logout'}>
                          <Link as="span" variant="link" className={'capitalize-first'}>
                            {t('common:logout')}
                          </Link>
                        </NextLink>
                      </Button>
                    : ''}
                  </Button.Group>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Header>
    </div>
    <div className='main-area'>
      {showSection(selectedSubMenu)}
    </div>
  </>
  );
};
